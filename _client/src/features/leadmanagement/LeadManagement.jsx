/* eslint-disable no-unused-vars */
import useFilters from '@/hooks/useFilters';
import useLeads from '@/hooks/useLeads';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import PropTypes from 'prop-types';
import React, { useCallback, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import LeadCard from './components/LeadCard';
import LeadsTable from './components/LeadsTable';
import Notification from './components/Notification';
import Pagination from './components/Pagination';
import SearchFilters from './components/SearchFilter';
import './leadmanagement.css';

const API_URL = "";

const LeadsManagement = ({ setActivePage }) => {
    const [activeTab, setActiveTab] = useState('all');
    const [selectedLead, setSelectedLead] = useState(null);
    const [showLeadCard, setShowLeadCard] = useState(false);

    const { filters, setFilter, clearFilters } = useFilters();
    const { leads, leadCount, filteredLeadCount, isLoading, error, fetchLeads, updateLead } = useLeads(filters);

    const handleTabChange = useCallback((tab) => {
        if (tab === 'all') {
            clearFilters();
        }
        setActiveTab(tab);
    }, [clearFilters]);

    const handleViewLead = useCallback((lead) => {
        setSelectedLead(lead);
        setShowLeadCard(true);
    }, []);

    const handleCloseLeadCard = useCallback(() => {
        setShowLeadCard(false);
        setSelectedLead(null);
    }, []);

    const handleLeadUpdate = useCallback((updatedLead) => {
        updateLead(updatedLead);
        setShowLeadCard(false);
        toast.success('Lead updated successfully', { duration: 4000 });
    }, [updateLead]);

    const openFilterPage = useCallback(() => setActivePage('filter'), [setActivePage]);
    const openDataCleaningPage = useCallback(() => setActivePage('data-cleaning'), [setActivePage]);

    const isFiltering = useMemo(() => {
        return Object.values(filters).some((value) => value !== '');
    }, [filters]);

    return (
        <motion.div
            className="leads-management-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <Notification message={error} />
            <div className="page-header">
                <div className="breadcrumb">
                    <span className="active">Lead Management</span>
                </div>
                <SearchFilters
                    filters={filters}
                    setFilter={setFilter}
                    clearFilters={clearFilters}
                    openFilterPage={openFilterPage}
                    openDataCleaningPage={openDataCleaningPage}
                />
            </div>
            <div className="tabs">
                <button
                    className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => handleTabChange('all')}
                    aria-label="View all leads"
                >
                    All Leads ({leadCount})
                </button>
                <button
                    className={`tab ${activeTab === 'filtered' ? 'active' : ''}`}
                    onClick={() => handleTabChange('filtered')}
                    disabled={!isFiltering}
                    aria-label="View filtered leads"
                >
                    Filtered Leads ({filteredLeadCount})
                </button>
            </div>
            {isLoading ? (
                <div className="loading-indicator">
                    <Loader2 className="spinner" />
                    <span>Loading leads...</span>
                </div>
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <LeadsTable leads={leads || []} onViewLead={handleViewLead} />
            )}
            {showLeadCard && selectedLead && (
                <LeadCard
                    lead={selectedLead}
                    onClose={handleCloseLeadCard}
                    onLeadUpdate={handleLeadUpdate}
                />
            )}
            <Pagination />
        </motion.div>
    );
};

LeadsManagement.propTypes = {
    setActivePage: PropTypes.func.isRequired,
};

LeadsManagement.defaultProps = {
    setActivePage: () => { },
};

export default React.memo(LeadsManagement);