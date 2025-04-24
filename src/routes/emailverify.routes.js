import { Router } from 'express';
import { verifyEmailController } from '../controllers/email.controller.js';

const router = Router();

router.post('/verify', verifyEmailController);

export default router;
