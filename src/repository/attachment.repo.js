import db from '../config/database.js';

export const createAttachment = async ({
    promotion_id,
    file_name,
    file_path,
    file_size,
    file_type,
}) => {
    const [result] = await db.query(
        `INSERT INTO attachments 
        (promotion_id, file_name, file_path, file_size, file_type) 
        VALUES (?, ?, ?, ?, ?)`,
        [promotion_id, file_name, file_path, file_size, file_type]
    );
    return {
        id: result.insertId,
        promotion_id,
        file_name,
        file_type,
        file_size,
        uploaded_at: new Date(),
    };
};
// github