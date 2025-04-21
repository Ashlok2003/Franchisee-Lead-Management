import db from '../config/database.js';

export const sendMessage = async ({ promotion_id, lead_id, type, content }) => {
    const now = new Date();
    const [messageResult] = await db.query(
        'INSERT INTO messages (promotion_id, lead_id, type, content, status, sent_at) VALUES (?, ?, ?, ?, ?, ?)',
        [promotion_id, lead_id, type, content, 'Sent', now]
    );
    await db.query(
        'UPDATE promotion_leads SET status = ?, sent_at = ? WHERE promotion_id = ? AND lead_id = ?',
        ['Sent', now, promotion_id, lead_id]
    );
    return {
        id: messageResult.insertId,
        promotion_id,
        lead_id,
        type,
        status: 'Sent',
        sent_at: now,
    };
};

export const scheduleMessages = async ({ name, type, subject, body, scheduled_date, lead_ids }) => {
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const [promotionResult] = await connection.query(
            'INSERT INTO promotions (name, type, status, scheduled_date, subject, body) VALUES (?, ?, ?, ?, ?, ?)',
            [name, type, 'Scheduled', scheduled_date, subject || null, body]
        );
        const promotion_id = promotionResult.insertId;
        for (const lead_id of lead_ids) {
            await connection.query(
                'INSERT INTO promotion_leads (promotion_id, lead_id, status) VALUES (?, ?, ?)',
                [promotion_id, lead_id, 'Pending']
            );
        }
        await connection.commit();
        return { promotion_id, scheduled_date, lead_count: lead_ids.length };
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};
