import { Router } from 'express';
import {
    addLeadsToPromotionController,
    createPromotionController,
    getPromotionByIdController,
    getPromotionStatusController,
    getPromotionsController,
    sendPromotionNowController,
} from '../controllers/promotion.controller.js';

const router = Router();

router.get('/', getPromotionsController);
router.get('/:id', getPromotionByIdController);
router.post('/', createPromotionController);
router.post('/:id/leads', addLeadsToPromotionController);
router.post('/send/:id', sendPromotionNowController);
router.post('/status/:id', getPromotionStatusController);

export default router;
