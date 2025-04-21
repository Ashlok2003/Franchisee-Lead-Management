import { Router } from 'express';
import attachmentRoutes from './attachment.routes.js';
import leadsRoutes from './leads.routes.js';
import messageRoutes from './message.routes.js';
import promotionRoutes from './promotion.routes.js';
import templatesRoutes from './template.routes.js';

const router = Router();

router.use('/templates', templatesRoutes);
router.use('/attachment', attachmentRoutes);
router.use('/leads', leadsRoutes);
router.use('/messages', messageRoutes);
router.use('/promotions', promotionRoutes);

export default router;
