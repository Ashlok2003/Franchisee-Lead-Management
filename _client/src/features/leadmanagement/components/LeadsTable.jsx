import PropTypes from 'prop-types';

const LeadsTable = ({ leads = [], onViewLead }) => {
    return (
        <div className="leads-table-container">
            <table className="leads-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Location</th>
                        <th>Status</th>
                        <th>Update Status</th>
                        <th>Revenue</th>
                        <th>Source</th>
                        <th>Franchise Developer</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leads.length > 0 ? (
                        leads.map((lead) => (
                            <tr key={lead.id}>
                                <td>{lead.name_of_lead}</td>
                                <td>
                                    <div>{lead.email_id}</div>
                                    <div>{lead.contact_number}</div>
                                </td>
                                <td>
                                    <div>{lead.city}</div>
                                    <div>{lead.state}</div>
                                </td>
                                <td className={`status-${lead.status?.toLowerCase().replace(' ', '-')}`}>
                                    {lead.status}
                                </td>
                                <td>{lead.lead_update_status}</td>
                                <td>${lead.revenue_amount ? Number(lead.revenue_amount).toFixed(2) : '0.00'}</td>
                                <td>{lead.source}</td>
                                <td>{lead.franchise_developer_name}</td>
                                <td>
                                    <div className="action-buttons">
                                        <button
                                            className="view-btn"
                                            onClick={() => onViewLead(lead)}
                                            aria-label={`View lead ${lead.name_of_lead}`}
                                        >
                                            <i className="fas fa-eye"></i> View
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="9" className="no-leads">
                                No leads found
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

LeadsTable.propTypes = {
    leads: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name_of_lead: PropTypes.string,
            email_id: PropTypes.string,
            contact_number: PropTypes.string,
            city: PropTypes.string,
            state: PropTypes.string,
            status: PropTypes.string,
            lead_update_status: PropTypes.string,
            revenue_amount: PropTypes.number,
            source: PropTypes.string,
            franchise_developer_name: PropTypes.string,
        })
    ).isRequired,
    onViewLead: PropTypes.func.isRequired,
};

export default LeadsTable;