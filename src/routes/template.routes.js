import { Router } from 'express';
import {
    createTemplateController,
    deleteTemplateController,
    getTemplateByIdController,
    getTemplatesController,
    updateTemplateController,
} from '../controllers/template.controller.js';
const router = Router();

router.get('/', getTemplatesController);
router.get('/:id', getTemplateByIdController);
router.post('/', createTemplateController);
router.put('/:id', updateTemplateController);
router.delete('/:id', deleteTemplateController);

export default router;
