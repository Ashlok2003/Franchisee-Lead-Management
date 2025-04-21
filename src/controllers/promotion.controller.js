import {
    addLeadsToPromotionService,
    createPromotionService,
    getAllPromotionsService,
    getPromotionByIdService,
} from '../services/promotion.service.js';

export const getPromotionsController = async (req, res, next) => {
    try {
        const { status, type } = req.query;
        const promotions = await getAllPromotionsService({ status, type });
        res.json(promotions);
    } catch (error) {
        next(error);
    }
};

export const getPromotionByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const promotion = await getPromotionByIdService(id);
        res.json(promotion);
    } catch (error) {
        next(error);
    }
};

export const createPromotionController = async (req, res, next) => {
    try {
        const promotion = await createPromotionService(req.body);
        res.status(201).json({ ...promotion, message: 'Promotion created successfully' });
    } catch (error) {
        next(error);
    }
};

export const addLeadsToPromotionController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { lead_ids } = req.body;
        const results = await addLeadsToPromotionService(id, lead_ids);
        res.status(201).json({ message: 'Leads added to promotion successfully', results });
    } catch (error) {
        next(error);
    }
};
