import db from '../config/database.js';

export const findAllPromotions = async ({ status, type }) => {
    let query = 'SELECT * FROM promotions';
    const params = [];
    if (status || type) {
        query += ' WHERE';
        if (status) {
            query += ' status = ?';
            params.push(status);
        }
        if (type) {
            if (status) query += ' AND';
            query += ' type = ?';
            params.push(type);
        }
    }
    query += ' ORDER BY created_at DESC';
    const [rows] = await db.query(query, params);
    return rows;
};

export const findPromotionById = async (id) => {
    const [promotions] = await db.query('SELECT * FROM promotions WHERE id = ?', [id]);
    return promotions[0];
};

export const createPromotion = async ({
    name,
    type,
    status,
    scheduled_date,
    created_by,
    subject,
    body,
}) => {
    const [result] = await db.query(
        'INSERT INTO promotions (name, type, status, scheduled_date, created_by, subject, body) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [name, type, status, scheduled_date || null, created_by || 1, subject || null, body || null]
    );
    return { id: result.insertId, name, type, status, scheduled_date, created_by, subject, body };
};

export const addLeadToPromotion = async (promotion_id, lead_id) => {
    const [leads] = await db.query('SELECT id FROM leads_database WHERE id = ?', [lead_id]);
    if (leads.length === 0) {
        throw new Error(`Lead with ID ${lead_id} not found`);
    }
    const [existing] = await db.query(
        'SELECT id FROM promotion_leads WHERE promotion_id = ? AND lead_id = ?',
        [promotion_id, lead_id]
    );
    if (existing.length > 0) {
        return { id: existing[0].id, promotion_id, lead_id, status: 'Already Added' };
    }
    const [result] = await db.query(
        'INSERT INTO promotion_leads (promotion_id, lead_id, status) VALUES (?, ?, ?)',
        [promotion_id, lead_id, 'Pending']
    );
    return { id: result.insertId, promotion_id, lead_id, status: 'Pending' };
};

export const getPromotionDetails = async (id) => {
    const [promotionLeads] = await db.query(
        `SELECT pl.id, pl.status, pl.sent_at, pl.opened_at, 
                l.id as lead_id, l.name_of_lead, l.city, l.state, 
                l.contact_number, l.email_id
         FROM promotion_leads pl
         JOIN leads_database l ON pl.lead_id = l.id
         WHERE pl.promotion_id = ?`,
        [id]
    );
    const [attachments] = await db.query(
        'SELECT id, file_name, file_type, file_size FROM attachments WHERE promotion_id = ?',
        [id]
    );
    return { leads: promotionLeads, attachments };
};
