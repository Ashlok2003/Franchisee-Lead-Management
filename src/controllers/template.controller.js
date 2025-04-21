import {
    createTemplateService,
    deleteTemplateService,
    getAllTemplatesService,
    getTemplateByIdService,
    updateTemplateService,
} from '../services/template.service.js';

export const getTemplatesController = async (req, res, next) => {
    try {
        const { type } = req.query;
        const templates = await getAllTemplatesService(type);
        res.json(templates);
    } catch (error) {
        next(error);
    }
};

export const getTemplateByIdController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const template = await getTemplateByIdService(id);
        res.json(template);
    } catch (error) {
        next(error);
    }
};

export const createTemplateController = async (req, res, next) => {
    try {
        const template = await createTemplateService(req.body);
        res.status(201).json({ ...template, message: 'Template saved successfully' });
    } catch (error) {
        next(error);
    }
};

export const updateTemplateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const template = await updateTemplateService(id, req.body);
        res.json({ ...template, message: 'Template updated successfully' });
    } catch (error) {
        next(error);
    }
};

export const deleteTemplateController = async (req, res, next) => {
    try {
        const { id } = req.params;
        await deleteTemplateService(id);
        res.json({ message: 'Template deleted successfully' });
    } catch (error) {
        next(error);
    }
};
