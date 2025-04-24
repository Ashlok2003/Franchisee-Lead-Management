import db from '../config/database.js';

export const queryDatabase = async (sql, params) => {
    try {
        const result = await db.query(sql, params);
        return result;
    } catch (err) {
        console.error('Error executing query:', err);
        console.log('SQL:', sql);
        console.log('Params:', params);
        throw new Error('Database query failed');
    }
};

export const getAllLeads = async ({ search, location, leadType, leadsUpdateStatus, source }) => {
    let sql = 'SELECT * FROM leads_database WHERE 1=1';
    const params = [];

    if (search) {
        sql += ' AND (name_of_lead LIKE ? OR email_id LIKE ? OR contact_number LIKE ?)';
        const searchQuery = `%${search}%`;
        params.push(searchQuery, searchQuery, searchQuery);
    }
    if (leadsUpdateStatus) {
        sql += ' AND lead_update_status = ?';
        params.push(leadsUpdateStatus);
    }
    if (leadType) {
        sql += ' AND lead_type = ?';
        params.push(leadType);
    }
    if (source) {
        sql += ' AND source = ?';
        params.push(source);
    }
    if (location) {
        sql += ' AND (city LIKE ? OR state LIKE ?)';
        const locationQuery = `%${location}%`;
        params.push(locationQuery, locationQuery);
    }

    sql += ' ORDER BY id DESC';
    return await queryDatabase(sql, params);
};

export const getLeadById = async (id) => {
    const sql = 'SELECT * FROM leads_database WHERE id = ?';
    const [result] = await queryDatabase(sql, [id]);
    return result[0];
};

export const addLead = async (leadData) => {
    const sql = `INSERT INTO leads_database 
        (name_of_lead, city, state, contact_number, email_id, franchise_developer_name, source, 
        date_of_campaign, month, financial_year, status, notes, revenue_amount, 
        team_leader_assign, lead_update_status, leadType, remark)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const result = await queryDatabase(sql, Object.values(leadData));
    return result.insertId;
};

export const updateLead = async (id, leadData) => {
    const sql = `UPDATE leads_database SET 
        name_of_lead = ?, city = ?, state = ?, contact_number = ?, email_id = ?, 
        franchise_developer_name = ?, source = ?, date_of_campaign = ?, month = ?, 
        financial_year = ?, status = ?, notes = ?, revenue_amount = ?, 
        team_leader_assign = ?, lead_update_status = ?, leadType = ?, remark = ?
        WHERE id = ?`;

    await queryDatabase(sql, [...Object.values(leadData), id]);
};

export const deleteLead = async (id) => {
    const sql = 'DELETE FROM leads_database WHERE id = ?';
    await queryDatabase(sql, [id]);
};

export const getLeadCount = async () => {
    const sql = 'SELECT COUNT(*) AS totalLeads FROM leads_database';
    const [result] = await queryDatabase(sql, []);
    return result[0].totalLeads;
};

export const searchLeads = async (query) => {
    const searchQuery = `%${query}%`;
    const [rows] = await pool.query(
        `SELECT * FROM leads_database 
         WHERE name_of_lead LIKE ? 
         OR city LIKE ? 
         OR state LIKE ? 
         OR contact_number LIKE ? 
         OR email_id LIKE ? 
         OR franchise_developer_name LIKE ?
         OR status LIKE ?
         OR leadType LIKE ?
         OR source LIKE ?
         OR team_leader_assign LIKE ?
         OR remark LIKE ?`,
        Array(11).fill(searchQuery)
    );
    return rows;
};

export const getFilePath = async (id) => {
    const [result] = await db.query('SELECT file_path FROM upload_history WHERE id = ?', [id]);
    return result?.file_path;
};

export const saveUploadHistory = async (fileName, filePath, metadata) => {
    return await db.query(
        'INSERT INTO upload_history (file_name, file_path, metadata) VALUES (?, ?, ?)',
        [fileName, filePath, JSON.stringify(metadata)]
    );
};

export const getUploadHistory = async () => {
    const [rows] = await db.query(`
        SELECT 
            uh.id AS upload_id,
            uh.file_name,
            uh.upload_time,
            uh.metadata,
            GROUP_CONCAT(DISTINCT ld.leadType) AS leadTypes
        FROM upload_history uh
        LEFT JOIN leads_database ld ON ld.file_id = uh.id
        GROUP BY uh.id
    `);
    return rows;
};

