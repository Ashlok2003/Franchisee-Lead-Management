import db from '../config/database.js';
import {
    addLeadToPromotion,
    createPromotion,
    findAllPromotions,
    findPromotionById,
    getPromotionDetails,
} from '../repository/promotion.repo.js';

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
