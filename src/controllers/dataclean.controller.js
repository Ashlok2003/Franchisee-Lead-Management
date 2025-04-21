import { fetchLeadById, fetchLeads, setLeadStatus } from '../services/dataclean.js';

export const getLeadsController = async (req, res) => {
    try {
        const leads = await fetchLeads(req.query.status);
        res.json(leads);
    } catch (err) {
        console.error('Error fetching leads:', err);
        res.status(500).json({ error: 'Failed to fetch leads' });
    }
};

export const getLeadController = async (req, res) => {
    try {
        const lead = await fetchLeadById(req.params.id);
        res.json(lead);
    } catch (err) {
        const status = err.message === 'Lead not found' ? 404 : 500;
        res.status(status).json({ error: err.message });
    }
};

export const updateStatusController = async (req, res) => {
    try {
        const { status } = req.body;
        const { id } = req.params;
        const result = await setLeadStatus(id, status);
        res.json({ message: 'Lead status updated successfully', ...result });
    } catch (err) {
        const status =
            err.message === 'Lead not found' || err.message === 'Status is required' ? 400 : 500;
        res.status(status).json({ error: err.message });
    }
};
