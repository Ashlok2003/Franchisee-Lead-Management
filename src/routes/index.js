import { Router } from 'express';
import aiRoutes from './ai.routes.js';
import attachmentRoutes from './attachment.routes.js';
import emailverifyRoutes from './emailverify.routes.js';
import leadsRoutes from './leads.routes.js';
import messageRoutes from './message.routes.js';
import promotionRoutes from './promotion.routes.js';
import smsRoutes from './sms.routes.js';
import templatesRoutes from './template.routes.js';

const router = Router();

router.use('/templates', templatesRoutes);
router.use('/attachment', attachmentRoutes);
router.use('/leads', leadsRoutes);
router.use('/messages', messageRoutes);
router.use('/promotions', promotionRoutes);
router.use('/email', emailverifyRoutes);
router.use('/ai', aiRoutes);
router.use('/sms', smsRoutes);

export default router;
