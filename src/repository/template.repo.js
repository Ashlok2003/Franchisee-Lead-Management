import db from '../config/database.js';

export const findAllTemplates = async (type) => {
    const query = type
        ? 'SELECT * FROM promotion_templates WHERE type = ?'
        : 'SELECT * FROM promotion_templates';
    const [rows] = await db.query(query, type ? [type] : []);
    return rows;
};

export const findTemplateById = async (id) => {
    const [rows] = await db.query('SELECT * FROM promotion_templates WHERE id = ?', [id]);
    return rows[0];
};

export const createTemplate = async ({ name, type, subject, body, created_by }) => {
    const [result] = await db.query(
        'INSERT INTO promotion_templates (name, type, subject, body, created_by) VALUES (?, ?, ?, ?, ?)',
        [name, type, subject || null, body, created_by || 1]
    );
    return { id: result.insertId, name, type, subject, body, created_by };
};

export const updateTemplate = async (id, { name, type, subject, body }) => {
    await db.query(
        'UPDATE promotion_templates SET name = ?, type = ?, subject = ?, body = ? WHERE id = ?',
        [name, type, subject || null, body, id]
    );
    return { id: parseInt(id), name, type, subject, body };
};

export const deleteTemplate = async (id) => {
    await db.query('DELETE FROM promotion_templates WHERE id = ?', [id]);
    return { message: 'Template deleted successfully', id };
};
