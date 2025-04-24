import { Check, Search } from 'lucide-react';
import PropTypes from 'prop-types';
import '../promotion.css';

const LeadTable = ({ leads, loading, error, selectedIds, onSelect, onSelectAll, searchQuery, onSearch }) => {
    return (
        <div className="lead-table-container">
            <div className="table-controls">
                <div className="search-container">
                    <Search className="icon search-icon" />
                    <input
                        type="text"
                        placeholder="Search by name, contact, or location..."
                        value={searchQuery}
                        onChange={(e) => onSearch(e.target.value)}
                        className="search-input"
                        aria-label="Search leads"
                    />
                </div>
                <button className="select-all-button" onClick={onSelectAll} aria-label={selectedIds.length === leads.length ? 'Deselect all leads' : 'Select all leads'}>
                    {selectedIds.length === leads.length ? 'Deselect All' : 'Select All'}
                </button>
            </div>

            <div className="table-wrapper">
                {loading ? (
                    <div className="table-message">Loading leads...</div>
                ) : error ? (
                    <div className="table-message table-error">{error}</div>
                ) : leads.length === 0 ? (
                    <div className="table-message">No leads found</div>
                ) : (
                    <table className="lead-table">
                        <thead>
                            <tr>
                                <th>
                                    <input
                                        type="checkbox"
                                        checked={selectedIds.length === leads.length && leads.length > 0}
                                        onChange={onSelectAll}
                                        aria-label="Select all leads"
                                    />
                                </th>
                                <th>Name</th>
                                <th>Contact</th>
                                <th>Location</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {leads.map((lead) => (
                                <tr key={lead.id} className="table-row">
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={selectedIds.includes(lead.id)}
                                            onChange={() => onSelect(lead.id)}
                                            aria-label={`Select lead ${lead.name}`}
                                        />
                                    </td>
                                    <td>
                                        <div className="lead-info">
                                            <img
                                                src={lead.avatar || '/api/placeholder/40/40'}
                                                alt={lead.name}
                                                className="lead-avatar"
                                            />
                                            <span>{lead.name}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="contact-info">
                                            <div>{lead.phone || 'N/A'}</div>
                                            <div>{lead.email || 'N/A'}</div>
                                        </div>
                                    </td>
                                    <td>{lead.location || 'Unknown'}</td>
                                    <td>
                                        <span className={`status-badge status-${lead.status.toLowerCase().replace(' ', '-')}`}>
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button className="action-button" aria-label={`View details for ${lead.name}`}>
                                            <Check className="icon" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

LeadTable.propTypes = {
    leads: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            name: PropTypes.string.isRequired,
            phone: PropTypes.string,
            email: PropTypes.string,
            location: PropTypes.string,
            status: PropTypes.string.isRequired,
            avatar: PropTypes.string,
        })
    ).isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    selectedIds: PropTypes.arrayOf(PropTypes.number).isRequired,
    onSelect: PropTypes.func.isRequired,
    onSelectAll: PropTypes.func.isRequired,
    searchQuery: PropTypes.string.isRequired,
    onSearch: PropTypes.func.isRequired,
};

export default LeadTable;