import PropTypes from 'prop-types';
import { Table, Button, Container } from 'react-bootstrap';

const ContactList = ({ contacts, onUpdate, onDelete }) => {
    return (
        <Container
            fluid
            className="d-flex justify-content-center align-items-center"
            style={{
                minHeight: '100vh',  // Ensure the container takes up the full viewport height
                padding: 0,          // Remove default padding from Container
            }}
        >
            <div
                className="p-4 border rounded shadow"
                style={{
                    backgroundColor: '#f9f9f9',
                    width: '100%',  // Ensure it adapts to screen width
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center', // Center the content horizontally inside the div
                }}
            >
                <h2 className="text-center mb-4">Contact List</h2>
                <Table
                    responsive
                    className="table-bordered align-middle text-center"
                    style={{
                        borderCollapse: 'separate',
                        borderSpacing: '10px 15px',  // Adds space between rows and columns
                        backgroundColor: '#ffffff',
                        borderRadius: '8px',
                        width: '100%',  // Make sure the table is responsive
                    }}
                >
                    <thead
                        style={{
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        <tr>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>First Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Last Name</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Email</th>
                            <th style={{ border: '1px solid #ddd', padding: '10px' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {contacts.map((contact) => (
                            <tr
                                key={contact.id}
                                style={{
                                    border: '1px solid #ddd',
                                    transition: 'background-color 0.3s',
                                }}
                                onMouseEnter={(e) =>
                                    (e.currentTarget.style.backgroundColor = '#f9f9f9')
                                }
                                onMouseLeave={(e) =>
                                    (e.currentTarget.style.backgroundColor = '')
                                }
                            >
                                <td style={{ border: '1px solid #ddd', padding: '10px' }} className="fw-bold">
                                    {contact.firstName}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    {contact.lastName}
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    <a
                                        href={`mailto:${contact.email}`}
                                        className="text-decoration-none text-primary"
                                    >
                                        {contact.email}
                                    </a>
                                </td>
                                <td style={{ border: '1px solid #ddd', padding: '10px' }}>
                                    <Button
                                        variant="warning"
                                        size="sm"
                                        className="me-2"
                                        onClick={() => onUpdate(contact.id)}
                                    >
                                        Update
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => onDelete(contact.id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
            firstName: PropTypes.string.isRequired,
            lastName: PropTypes.string.isRequired,
            email: PropTypes.string.isRequired,
        })
    ).isRequired,
    onUpdate: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
};

export default ContactList;
