import { ZodError } from 'zod';
import * as service from '../services/leadsUploadService.js';
import { addLeadBody } from '../validation/uploadValidator.js';

export const getUploadHistory = async (_, res) => {
    try {
        const history = await service.fetchUploadHistory();
        res.json(history);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch upload history' });
    }
};

export const uploadFile = async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const leadType = req.body.leadType || 'New';
    try {
        const result = await service.processCsvUpload(req.file.path, leadType);
        res.json({
            success: true,
            records: result.count,
            message: `Successfully imported ${result.count} records`,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message || 'Failed to process CSV file' });
    }
};

export const addLead = async (req, res) => {
    try {
        const parsed = addLeadBody.parse(req.body);
        const record = {
            name_of_lead: parsed.name || '',
            city: parsed.city || '',
            state: parsed.state || '',
            contact_number: parsed.contactNumber || '',
            email_id: parsed.email || '',
            franchise_developer_name: parsed.franchiseDeveloper || '',
            source: parsed.source || '',
            date_of_campaign: parsed.campaignDate || null,
            month: parsed.month || '',
            financial_year: parsed.financialYear || '',
            status: parsed.status || 'Pending',
            notes: parsed.notes || '',
            lead_update_status: parsed.isUpdated ? 'Updated' : 'Not Updated',
            leadType: 'New',
        };
        const id = await service.createLead(record);
        res.json({ success: true, id, message: 'Lead added successfully' });
    } catch (err) {
        if (err instanceof ZodError) {
            return res.status(400).json({ error: 'Invalid request body', details: err.errors });
        }
        console.error(err);
        res.status(500).json({ error: 'Failed to add lead data' });
    }
};
