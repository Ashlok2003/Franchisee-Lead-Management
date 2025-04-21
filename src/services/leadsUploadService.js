import csvParser from 'csv-parser';
import fs from 'fs';
import path from 'path';
import * as repo from '../repository/leadsUploadRepository.js';

export const fetchUploadHistory = () => repo.getUploadHistory();

export const processCsvUpload = async (filePath, leadType) => {
    const rows = await new Promise((resolve, reject) => {
        const buffer = [];
        fs.createReadStream(filePath)
            .pipe(csvParser())
            .on('data', (row) => buffer.push(row))
            .on('end', () =>
                buffer.length ? resolve(buffer) : reject(new Error('Empty or invalid CSV file'))
            )
            .on('error', reject);
    });

    const formatted = rows.map((row) => ({
        name_of_lead: row.name_of_lead || row.name || '',
        city: row.city || '',
        state: row.state || '',
        contact_number: row.contact_number || row.contactNumber || row.phone || '',
        email_id: row.email_id || row.email || '',
        franchise_developer_name: row.franchise_developer_name || row.franchiseDeveloper || '',
        source: row.source || '',
        date_of_campaign: row.date_of_campaign || row.campaignDate || null,
        month: row.month || '',
        financial_year: row.financial_year || row.financialYear || '',
        status: row.status || 'Pending',
        notes: row.notes || '',
        revenue_amount: parseFloat(row.revenue_amount || 0),
        team_leader_assign: row.team_leader_assign || '',
        lead_update_status: row.lead_update_status === 'Updated' ? 'Updated' : 'Not Updated',
        leadType,
        remark: row.remark || '',
    }));

    const insertIds = await Promise.all(formatted.map(repo.insertLead));

    await repo.insertUploadHistory({
        file_name: path.basename(filePath),
        file_path: filePath,
        metadata: JSON.stringify({
            imported_ids: insertIds,
            lead_type: leadType,
            total_records: formatted.length,
        }),
    });

    return { count: formatted.length };
};

export const createLead = (record) => repo.insertLead(record);
