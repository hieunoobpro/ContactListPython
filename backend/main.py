from flask import request, jsonify
from config import app, db
from models import Contact

@app.route("/contacts", methods=["GET"])
def get_contacts():
    contacts = Contact.query.all()
    json_contacts = list(map(lambda x: x.to_json(), contacts))
    return jsonify({"contacts": json_contacts})

@app.route("/contacts", methods=["POST"])
def create_contact():
    first_name = request.json.get("firstName")
    last_name = request.json.get("lastName")
    email = request.json.get("email")
    
    if not first_name or not last_name or not email:
        return (
            jsonify({"message": "You must include firstname, lastname and email"}),
            400,
        )
    new_contact = Contact(first_name=first_name, last_name=last_name, email=email)
    try:
        db.session.add(new_contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify({"message": "User created successfully"}), 201

@app.route("/contacts/<int:id>", methods=["PATCH"])
def update_contact(id):
    contact = Contact.query.get_or_404(id)
    if not contact:
        return jsonify({"message": "User not found"}), 404
    data = request.json
    for key, value in data.items():
        setattr(contact, key, value)
    try:
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return jsonify(contact.to_json())

@app.route("/contacts/<int:id>", methods=["DELETE"])
def delete_contact(id):
    contact = Contact.query.get_or_404(id)
    if not contact:
        return jsonify({"message": "User not found"}), 404
    try:
        db.session.delete(contact)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    return 'Delete successful', 204

if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    
    app.run(debug=True)