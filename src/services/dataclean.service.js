import { getLeadById, getLeads, updateLeadStatus } from '../repository/dataclean.repo.js';

export const fetchLeads = async (status) => {
    return await getLeads(status);
};

export const fetchLeadById = async (id) => {
    const lead = await getLeadById(id);
    if (!lead) throw new Error('Lead not found');
    return lead;
};

export const setLeadStatus = async (id, status) => {
    if (!status) throw new Error('Status is required');
    const result = await updateLeadStatus(id, status);
    if (result.affectedRows === 0) throw new Error('Lead not found');
    return { id };
};
