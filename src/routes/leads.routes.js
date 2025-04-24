import { Router } from 'express';
import multer from 'multer';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

import {
    addLeadController,
    deleteLeadController,
    downloadFileController,
    getLeadController,
    getLeadCountController,
    getLeadsController,
    getTemplateController,
    searchLeadsController,
    updateLeadController,
    uploadHistoryController,
    uploadLeadsController,
} from '../controllers/lead.controller.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const uploadDir = path.join(__dirname, '..', 'uploads');
const upload = multer({ dest: uploadDir });

const router = Router();

router.get('/count', getLeadCountController);
router.get('/download', downloadFileController);
router.get('/template', getTemplateController);
router.get('/history', uploadHistoryController);
router.get('/search', searchLeadsController);

router.post('/upload', upload.single('file'), uploadLeadsController);
router.post('/', addLeadController);

router.get('/:id', getLeadController);
router.put('/:id', updateLeadController);
router.delete('/:id', deleteLeadController);

router.get('/', getLeadsController);

export default router;
