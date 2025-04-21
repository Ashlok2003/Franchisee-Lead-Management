import {
    addLead,
    deleteLead,
    getAllLeads,
    getLeadById,
    getLeadCount,
    searchLeads,
    updateLead,
} from '../repository/lead.repo.js';

export const getLeadsService = async (filters) => {
    try {
        const leads = await getAllLeads(filters);
        return leads;
    } catch (err) {
        throw new Error('Error fetching leads');
    }
};

export const getLeadService = async (id) => {
    try {
        const lead = await getLeadById(id);
        if (!lead) throw new Error('Lead not found');
        return lead;
    } catch (err) {
        throw new Error('Lead not found');
    }
};

export const createLeadService = async (leadData) => {
    try {
        const newLeadId = await addLead(leadData);
        return newLeadId;
    } catch (err) {
        throw new Error('Error adding lead');
    }
};

export const modifyLeadService = async (id, leadData) => {
    try {
        await updateLead(id, leadData);
    } catch (err) {
        throw new Error('Error updating lead');
    }
};

export const removeLeadService = async (id) => {
    try {
        await deleteLead(id);
    } catch (err) {
        throw new Error('Error deleting lead');
    }
};

export const getLeadsCountService = async () => {
    try {
        const count = await getLeadCount();
        return count;
    } catch (err) {
        throw new Error('Error fetching lead count');
    }
};

export const searchLeadsService = async (query) => {
    if (!query || query.trim() === '') {
        throw new Error('Search query is required');
    }

    return await searchLeads(query.trim());
};