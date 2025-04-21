import { Router } from 'express';
import { uploadAttachmentService } from '../services/attachment.service.js';

const router = Router();
router.post('/', uploadAttachmentService);

export default router;
