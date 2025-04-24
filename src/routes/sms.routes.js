import { Router } from 'express';
import { sendOTP } from '../controllers/sms.controller.js';

const router = Router();
router.post('/send-otp', sendOTP);

export default router;
