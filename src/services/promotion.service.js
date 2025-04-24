import handlebars from 'handlebars';
import db from '../config/database.js';
import { getAttachmentsForPromotion } from '../repository/attachment.repo.js';
import { logMessage } from '../repository/message.repo.js';
import {
    addLeadToPromotion,
    createPromotion,
    findAllPromotions,
    findPromotionById,
    getLeadsForPromotion,
    getPromotionDetails,
    updateLeadStatus,
    updatePromotionStatus,
} from '../repository/promotion.repo.js';
import { sendEmail } from '../utils/mailer.js';

export const getAllPromotionsService = async (filters) => findAllPromotions(filters);

export const getPromotionByIdService = async (id) => {
    const promotion = await findPromotionById(id);
    if (!promotion) {
        throw new Error('Promotion not found');
    }
    const details = await getPromotionDetails(id);
    return { ...promotion, ...details };
};

export const createPromotionService = async (data) => {
    if (!data.name || !data.type || !data.status) {
        throw new Error('Name, type, and status are required fields');
    }
    return createPromotion(data);
};

export const addLeadsToPromotionService = async (promotion_id, lead_ids) => {
    if (!lead_ids || !Array.isArray(lead_ids) || lead_ids.length === 0) {
        throw new Error('Lead IDs array is required');
    }
    const results = [];
    const connection = await db.getConnection();
    try {
        await connection.beginTransaction();
        for (const lead_id of lead_ids) {
            const result = await addLeadToPromotion(promotion_id, lead_id);
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

export const sendPromotion = async (promotionId) => {
    const promotion = await getPromotionByIdService(promotionId);

    if (!promotion) throw new Error('Promotion not found');
    if (promotion.type !== 'Email') throw new Error('Promotion type must be Email');

    const leads = await getLeadsForPromotion(promotionId);
    const attachments = await getAttachmentsForPromotion(promotionId);

    const emailAttachments = attachments.map((att) => ({
        filename: att.file_name,
        path: att.file_path,
    }));

    for (const lead of leads) {
        try {
            const context = lead;

            const compiledSubject = handlebars.compile(promotion.subject)(context);
            const compiledBody = handlebars.compile(promotion.body)(context);

            await sendEmail(lead.email_id, compiledSubject, compiledBody, emailAttachments);

            const sentAt = new Date();
            await logMessage(promotionId, lead.id, 'Email', compiledBody, 'Sent', sentAt);
            await updateLeadStatus(promotionId, lead.id, 'Sent', sentAt);
        } catch (error) {
            console.error(`Failed to send email to ${lead.email_id}:`, error);
            const sentAt = new Date();
            await logMessage(promotionId, lead.id, 'Email', '', 'Failed', sentAt);
            await updateLeadStatus(promotionId, lead.id, 'Failed', sentAt);
        }
    }

    await updatePromotionStatus(promotionId, 'Completed');
};
