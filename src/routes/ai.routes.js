import express from 'express';
import { handleGenerateContent } from '../controllers/ai.controller.js';

const router = express.Router();

router.post('/generate', handleGenerateContent);

export default router;
