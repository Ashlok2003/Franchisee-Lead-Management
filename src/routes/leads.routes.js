import { Router } from 'express';
import {
    addLeadController,
    deleteLeadController,
    getLeadController,
    getLeadCountController,
    getLeadsController,
    searchLeadsController,
    updateLeadController,
} from '../controllers/lead.controller.js';

const router = Router();

router.get('/', getLeadsController);
router.get('/:id', getLeadController);
router.put('/:id', updateLeadController);
router.get('/search', searchLeadsController);
router.post('/', addLeadController);
router.delete('/:id', deleteLeadController);
router.get('/count', getLeadCountController);

export default router;
