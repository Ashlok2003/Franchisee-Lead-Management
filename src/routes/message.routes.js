import { Router } from 'express';
import { scheduleMessagesService, sendMessagesService } from '../services/message.service.js';

const router = Router();

router.post('/send', sendMessagesService);
router.post('/schedule', scheduleMessagesService);

export default router;
