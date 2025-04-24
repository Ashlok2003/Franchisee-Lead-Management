import axios from 'axios';
import PropTypes from 'prop-types';
import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';

const API_URL = "";

const LeadCard = ({ lead, onClose, onLeadUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({ ...lead });

    const fields = [
        { label: 'Name', name: 'name_of_lead' },
        { label: 'Email', name: 'email_id', type: 'email' },
        { label: 'Phone', name: 'contact_number' },
        { label: 'City', name: 'city' },
        { label: 'State', name: 'state' },
        { label: 'Lead Status', name: 'status' },
        { label: 'Lead Type', name: 'leadType' },
        { label: 'Source', name: 'source' },
        { label: 'Revenue Amount', name: 'revenue_amount', type: 'number' },
        { label: 'Update Status', name: 'lead_update_status' },
        { label: 'Franchise Developer', name: 'franchise_developer_name' },
        { label: 'Campaign Date', name: 'date_of_campaign', type: 'date' },
        { label: 'Month', name: 'month' },
        { label: 'Financial Year', name: 'financial_year' },
        { label: 'Notes', name: 'notes', type: 'textarea' },
        { label: 'Team Leader Assigned', name: 'team_leader_assign' },
        { label: 'Remark', name: 'remark' },
    ];

    const handleChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }, []);

    const handleEditClick = useCallback(() => {
        setIsEditing(true);
    }, []);

    const handleCancelClick = useCallback(() => {
        setFormData({ ...lead });
        setIsEditing(false);
    }, [lead]);

    const handleSaveClick = useCallback(async () => {
        try {
            const response = await axios.put(`${API_URL}/leads/${lead.id}`, formData);
            if (response.status === 200) {
                onLeadUpdate({ ...formData, id: lead.id });
                setIsEditing(false);
            } else {
                throw new Error('Failed to update lead');
            }
        } catch (err) {
            console.error('Error updating lead:', err);
            toast.error('Failed to update lead', { duration: 4000 });
        }
    }, [lead.id, formData, onLeadUpdate]);

    return (
        <div className="popup-overlay" role="dialog" aria-labelledby="lead-card-title">
            <div className="popup-card">
                <button className="close-btn" onClick={onClose} aria-label="Close lead details">
                    ×
                </button>
                <h2 id="lead-card-title">Lead Details</h2>
                <div className="lead-form">
                    {fields.map((field) => (
                        <div key={field.name} className="form-group">
                            <label htmlFor={field.name}>{field.label}</label>
                            {isEditing ? (
                                field.type === 'textarea' ? (
                                    <textarea
                                        id={field.name}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        rows="4"
                                        aria-label={field.label}
                                    />
                                ) : (
                                    <input
                                        id={field.name}
                                        type={field.type || 'text'}
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        aria-label={field.label}
                                    />
                                )
                            ) : (
                                <span>{formData[field.name] || '-'}</span>
                            )}
                        </div>
                    ))}
                </div>
                <div className="form-actions">
                    {isEditing ? (
                        <>
                            <button className="save-btn" onClick={handleSaveClick} aria-label="Save lead changes">
                                Save
                            </button>
                            <button className="cancel-btn" onClick={handleCancelClick} aria-label="Cancel editing">
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button className="edit-btn" onClick={handleEditClick} aria-label="Edit lead">
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

LeadCard.propTypes = {
    lead: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name_of_lead: PropTypes.string,
        email_id: PropTypes.string,
        contact_number: PropTypes.string,
        city: PropTypes.string,
        state: PropTypes.string,
        status: PropTypes.string,
        leadType: PropTypes.string,
        source: PropTypes.string,
        revenue_amount: PropTypes.number,
        lead_update_status: PropTypes.string,
        franchise_developer_name: PropTypes.string,
        date_of_campaign: PropTypes.string,
        month: PropTypes.string,
        financial_year: PropTypes.string,
        notes: PropTypes.string,
        team_leader_assign: PropTypes.string,
        remark: PropTypes.string,
    }).isRequired,
    onClose: PropTypes.func.isRequired,
    onLeadUpdate: PropTypes.func.isRequired,
};

export default LeadCard;