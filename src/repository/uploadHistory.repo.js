import db from '../config/database.js';

export const createUploadRecord = async ({ file_name, file_path, metadata }) => {
    const [result] = await db.query(
        'INSERT INTO upload_history (file_name, file_path, metadata) VALUES (?, ?, ?)',
        [file_name, file_path, JSON.stringify(metadata)]
    );
    return { id: result.insertId, file_name, file_path };
};
