import { Router } from 'express';
import { getLead, getLeads, updateStatus } from '../controllers/dataclean.controller.js';

const router = Router();

router.get('/', getLeads);
router.get('/:id', getLead);
router.put('/:id', updateStatus);

export default router;
