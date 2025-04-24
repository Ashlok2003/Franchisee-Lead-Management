import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const API_URL = ''; // ✅ Ensure this is correctly set

const useLeads = (filters) => {
    const [leads, setLeads] = useState([]);
    const [leadCount, setLeadCount] = useState(0);
    const [filteredLeadCount, setFilteredLeadCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('Checking...');

    useEffect(() => {
        const testConnection = async () => {
            try {
                const response = await axios.get(`${API_URL}/test-connection`);
                setConnectionStatus(response?.data?.connected ? 'Connected' : 'Failed to connect');
            } catch (err) {
                console.error('Connection test error:', err);
                setConnectionStatus('Failed to connect');
                toast.error('Failed to connect to database', { duration: 4000 });
            }
        };
        testConnection();
    }, []);

    const fetchLeads = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const params = new URLSearchParams();
            Object.entries(filters).forEach(([key, value]) => {
                if (value) {
                    const paramKey = {
                        searchQuery: 'search',
                        locationQuery: 'location',
                        leadTypeFilter: 'leadType',
                        leadSourceFilter: 'source',
                        leadUpdateStatusFilter: 'leadsUpdateStatus',
                    }[key];
                    if (paramKey) params.append(paramKey, value);
                }
            });

            const response = await axios.get(`${API_URL}/leads`, { params });

            const leadsData = Array.isArray(response.data)
                ? response.data
                : Array.isArray(response.data?.leads)
                  ? response.data.leads
                  : [];

            setLeads(leadsData);
            setFilteredLeadCount(leadsData.length);
        } catch (err) {
            console.error('Error fetching leads:', err);
            setError('Failed to load leads. Please try again.');
            setLeads([]);
            setFilteredLeadCount(0);
            toast.error('Failed to load leads', { duration: 4000 });
        } finally {
            setIsLoading(false);
        }
    }, [filters]);

    useEffect(() => {
        const fetchLeadCounts = async () => {
            try {
                const response = await axios.get(`${API_URL}/leads/count`);
                setLeadCount(response.data?.count || 0);
            } catch (err) {
                console.error('Error fetching lead counts:', err);
                setLeadCount(0);
                toast.error('Failed to fetch lead counts', { duration: 4000 });
            }
        };
        fetchLeadCounts();
    }, []);

    useEffect(() => {
        fetchLeads();
    }, [fetchLeads]);

    const updateLead = useCallback(async (updatedLead) => {
        try {
            const response = await axios.put(`${API_URL}/leads/${updatedLead.id}`, updatedLead);
            if (response.status === 200) {
                setLeads((prevLeads) =>
                    prevLeads.map((lead) => (lead.id === updatedLead.id ? updatedLead : lead))
                );
            } else {
                throw new Error('Failed to update lead');
            }
        } catch (err) {
            console.error('Error updating lead:', err);
            toast.error('Failed to update lead', { duration: 4000 });
        }
    }, []);

    return {
        leads,
        leadCount,
        filteredLeadCount,
        isLoading,
        error,
        connectionStatus,
        fetchLeads,
        updateLead,
    };
};

export default useLeads;
