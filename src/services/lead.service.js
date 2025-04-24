import csv from 'csv-parser';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import {
    addLead,
    deleteLead,
    getAllLeads,
    getFilePath,
    getLeadById,
    getLeadCount,
    getUploadHistory,
    saveUploadHistory,
    searchLeads,
    updateLead,
} from '../repository/lead.repo.js';
import generateTemplate from '../utils/template.utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const parseCSV = (filePath) => {
    return new Promise((resolve, reject) => {
        const results = [];

        fs.createReadStream(filePath)
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => resolve(results))
            .on('error', reject);
    });
};

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

export const getUploadHistoryService = async () => {
    const data = await getUploadHistory();
    return data;
};

const getValidLeadUpdateStatus = (status) => {
    const validStatuses = ['Updated', 'Not Updated'];
    return validStatuses.includes(status) ? status : 'Not Updated';
};

export const uploadLeadsService = async (file, leadType) => {
    const filePath = path.join(__dirname, '..', 'uploads', file.filename);
    const leads = await parseCSV(filePath);

    for (const lead of leads) {
        lead.lead_update_status = getValidLeadUpdateStatus(lead.lead_update_status);
        const { id, ...rest } = lead;
        await addLead({ ...rest, leadType });
    }

    const metadata = { records: leads.length, leadType };
    await saveUploadHistory(file.originalname, filePath, metadata);

    return { records: leads.length };
};

export const downloadFileService = async (id) => {
    const filePath = await getFilePath(id);
    if (!filePath) {
        throw new Error('File not found');
    }
    return filePath;
};

export const getTemplateService = async () => {
    return generateTemplate();
};
