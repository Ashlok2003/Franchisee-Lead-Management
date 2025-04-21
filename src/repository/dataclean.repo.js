import db from '../config/database.js';

export const getLeads = async (status) => {
    let query = `SELECT * FROM leads_database WHERE 1=1`;

    if (status && status != 'all') {
        const normalizedStatus = status.replace(/ /g, '_').replace(/\b\w/g, (c) => c.toUpperCase());
        query += ` AND status = ?`;
        const [results] = await db.query(query, [normalizedStatus]);
        return results;
    }

    const [results] = await db.query(query);
    return results;
};

export const getLeadById = async (id) => {
    const [results] = await db.query('SELECT * FROM leads_database WHERE id = ?', [id]);
    return results[0];
};

export const updateLeadStatus = async (id, status) => {
    const [result] = await db.query(
        `
            UPDATE lead_database
            SET status = ?, updated_at = NOW()
            WHERE id = ?
    `,
        [status, id]
    );
    return result;
};
