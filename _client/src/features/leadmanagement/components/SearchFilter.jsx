import PropTypes from 'prop-types';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';

const SearchFilters = ({ filters, setFilter, clearFilters, openFilterPage, openDataCleaningPage }) => {
    const [isAddingSource, setIsAddingSource] = useState(false);
    const [newSourceInput, setNewSourceInput] = useState('');
    const [customSources, setCustomSources] = useState([]);

    const leadTypeOptions = [
        'In Progress',
        'On Hold',
        'Prospect',
        'Cancelled',
        'Closed',
        'Meeting',
        'Webinar',
        'Ringing',
    ];

    const leadUpdateStatusOptions = ['Updated', 'Not Updated'];
    const leadSourceOptions = useMemo(() => ['Website', 'Exhibition', 'Referral', 'Social Media', ...customSources], [customSources]);

    const handleAddSource = useCallback(() => {
        if (newSourceInput && !customSources.includes(newSourceInput) && !leadSourceOptions.includes(newSourceInput)) {
            setCustomSources((prev) => [...prev, newSourceInput]);
            setNewSourceInput('');
            setIsAddingSource(false);
            toast.success(`New source "${newSourceInput}" added`, { duration: 4000 });
        } else {
            setIsAddingSource(false);
        }
    }, [newSourceInput, customSources, leadSourceOptions]);

    const handleKeyPress = useCallback((e) => {
        if (e.key === 'Enter') {
            handleAddSource();
        }
    }, [handleAddSource]);

    return (
        <div className="header-actions">
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search leads..."
                    value={filters.searchQuery}
                    onChange={(e) => setFilter('searchQuery', e.target.value)}
                    aria-label="Search leads"
                />
                <i className="fas fa-search"></i>
            </div>
            <div className="search-box">
                <input
                    type="text"
                    placeholder="Search by City or State..."
                    value={filters.locationQuery}
                    onChange={(e) => setFilter('locationQuery', e.target.value)}
                    aria-label="Search by location"
                />
                <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="filter-dropdown">
                <select
                    value={filters.leadTypeFilter}
                    onChange={(e) => setFilter('leadTypeFilter', e.target.value)}
                    aria-label="Select lead status"
                >
                    <option value="">Select Lead Status</option>
                    {leadTypeOptions.map((type) => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>
            <div className="filter-dropdown source-dropdown">
                <select
                    value={filters.leadSourceFilter}
                    onChange={(e) => {
                        if (e.target.value === 'add-new') {
                            setIsAddingSource(true);
                            setFilter('leadSourceFilter', '');
                        } else {
                            setFilter('leadSourceFilter', e.target.value);
                        }
                    }}
                    aria-label="Select lead source"
                >
                    <option value="">Select Lead Source</option>
                    {leadSourceOptions.map((source) => (
                        <option key={source} value={source}>{source}</option>
                    ))}
                    <option value="add-new">+ Add New Source</option>
                </select>
                {isAddingSource && (
                    <div className="add-source-dropdown">
                        <input
                            type="text"
                            placeholder="Enter new source..."
                            value={newSourceInput}
                            onChange={(e) => setNewSourceInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            autoFocus
                            aria-label="New source input"
                        />
                        <div className="add-source-actions">
                            <button className="add-btn" onClick={handleAddSource} aria-label="Add new source">
                                Add
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={() => setIsAddingSource(false)}
                                aria-label="Cancel adding source"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="filter-dropdown">
                <select
                    value={filters.leadUpdateStatusFilter}
                    onChange={(e) => setFilter('leadUpdateStatusFilter', e.target.value)}
                    aria-label="Select update status"
                >
                    <option value="">Select Update Status</option>
                    {leadUpdateStatusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                    ))}
                </select>
            </div>
            {(filters.searchQuery ||
                filters.locationQuery ||
                filters.leadTypeFilter ||
                filters.leadSourceFilter ||
                filters.leadUpdateStatusFilter) && (
                    <button className="btn btn-secondary" onClick={clearFilters} aria-label="Clear all filters">
                        <i className="fas fa-times"></i> Clear Filters
                    </button>
                )}
            <button className="btn btn-secondary btn-sm" onClick={openFilterPage} aria-label="Open filter page">
                <i className="fas fa-filter"></i>
                <span>Filter</span>
            </button>
            <button
                className="btn btn-secondary btn-sm"
                onClick={openDataCleaningPage}
                aria-label="Open data cleaning page"
            >
                <i className="fas fa-broom"></i>
                <span>Start Cleaning</span>
            </button>
        </div>
    );
};

SearchFilters.propTypes = {
    filters: PropTypes.shape({
        searchQuery: PropTypes.string,
        locationQuery: PropTypes.string,
        leadTypeFilter: PropTypes.string,
        leadSourceFilter: PropTypes.string,
        leadUpdateStatusFilter: PropTypes.string,
    }).isRequired,
    setFilter: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
    openFilterPage: PropTypes.func.isRequired,
    openDataCleaningPage: PropTypes.func.isRequired,
};

export default SearchFilters;