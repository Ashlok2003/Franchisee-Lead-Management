import db from '../config/database.js';
import {
    scheduleMessages as scheduleMessagesRepo,
    sendMessage,
} from '../repository/message.repo.js';

export const sendMessagesService = async ({ promotion_id, lead_ids, type, content }) => {
    if (
        !promotion_id ||
        !lead_ids ||
        !Array.isArray(lead_ids) ||
        lead_ids.length === 0 ||
        !type ||
        !content
    ) {
        throw new Error('Promotion ID, lead IDs array, type, and content are required');
    }
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        const results = [];
        for (const lead_id of lead_ids) {
            const result = await sendMessage({
                promotion_id,
                lead_id,
                type,
                content,
            });
            results.push(result);
        }
        await connection.commit();
        return results;
    } catch (error) {
        await connection.rollback();
        throw error;
    } finally {
        connection.release();
    }
};

export const scheduleMessagesService = async (data) => {
    if (
        !data.name ||
        !data.type ||
        !data.body ||
        !data.lead_ids ||
        !Array.isArray(data.lead_ids) ||
        data.lead_ids.length === 0 ||
        !data.scheduled_date
    ) {
        throw new Error('Name, type, body, lead IDs array, and scheduled date are required');
    }
    return scheduleMessagesRepo(data);
};
