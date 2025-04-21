import { Router } from 'express';
import {
    addLeadsToPromotionService,
    createPromotionService,
    getAllPromotionsService,
    getPromotionByIdService,
} from '../services/promotion.service.js';

const router = Router();

router.get('/', getAllPromotionsService);
router.get('/:id', getPromotionByIdService);
router.post('/', createPromotionService);
router.post('/:id/leads', addLeadsToPromotionService);

export default router;
