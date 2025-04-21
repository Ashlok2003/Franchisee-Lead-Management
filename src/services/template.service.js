import {
    createTemplate,
    deleteTemplate,
    findAllTemplates,
    findTemplateById,
    updateTemplate,
} from '../repository/template.repo.js';

export const getAllTemplatesService = async (type) => findAllTemplates(type);

export const getTemplateByIdService = async (id) => {
    const template = await findTemplateById(id);
    if (!template) {
        throw new Error('Template not found');
    }
    return template;
};

export const createTemplateService = async (data) => {
    if (!data.name || !data.type || !data.body) {
        throw new Error('Name, type, and body are required fields');
    }
    return createTemplate(data);
};

export const updateTemplateService = async (id, data) => {
    if (!data.name || !data.type || !data.body) {
        throw new Error('Name, type, and body are required fields');
    }
    return updateTemplate(id, data);
};

export const deleteTemplateService = async (id) => deleteTemplate(id);
