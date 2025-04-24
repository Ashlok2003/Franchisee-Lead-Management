import {
    createLeadService,
    downloadFileService,
    getLeadService,
    getLeadsCountService,
    getLeadsService,
    getTemplateService,
    getUploadHistoryService,
    modifyLeadService,
    removeLeadService,
    searchLeadsService,
    uploadLeadsService,
} from '../services/lead.service.js';

export const getLeadsController = async (req, res) => {
    try {
        const leads = await getLeadsService(req.query);
        res.json(leads);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Error fetching leads' });
    }
};

export const getLeadController = async (req, res) => {
    try {
        const lead = await getLeadService(req.params.id);
        res.json(lead);
    } catch (err) {
        res.status(404).json({ error: err.message || 'Lead not found' });
    }
};

export const addLeadController = async (req, res) => {
    try {
        const newLeadId = await createLeadService(req.body);
        res.status(201).json({ message: 'Lead added successfully', id: newLeadId });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message || 'Error adding lead' });
    }
};

export const updateLeadController = async (req, res) => {
    try {
        await modifyLeadService(req.params.id, req.body);
        res.json({ message: 'Lead updated successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message || 'Error updating lead' });
    }
};

export const deleteLeadController = async (req, res) => {
    try {
        await removeLeadService(req.params.id);
        res.json({ message: 'Lead deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message || 'Error deleting lead' });
    }
};

export const getLeadCountController = async (req, res) => {
    try {
        const count = await getLeadsCountService();
        res.json({ totalLeads: count });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Error fetching lead count' });
    }
};

export const searchLeadsController = async (req, res) => {
    try {
        const { query } = req.query;
        const results = await searchLeadsService(query);
        res.status(200).json({ data: results });
    } catch (error) {
        res.status(400).json({ error: error.message || 'Search failed' });
    }
};

export const uploadLeadsController = async (req, res) => {
    try {
        const result = await uploadLeadsService(req.file, req.body.leadType);
        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Upload Failed' });
    }
};

export const uploadHistoryController = async (req, res) => {
    try {
        const history = await getUploadHistoryService();
        console.log(history);
        res.json(history);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Fetching Upload History failed' });
    }
};

export const getTemplateController = async (req, res) => {
    try {
        const filePath = await getTemplateService();
        res.download(filePath);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Could not get templates' });
    }
};

export const downloadFileController = async (req, res) => {
    try {
        const filePath = await downloadFileService(req.params.id);
        res.download(filePath);
    } catch (error) {
        res.status(400).json({ error: error.message || 'Error while downloading' });
    }
};
