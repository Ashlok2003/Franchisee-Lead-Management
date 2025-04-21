import { uploadAttachmentService } from '../services/attachment.service.js';

export const uploadAttachmentController = async (req, res, next) => {
    try {
        const attachment = await uploadAttachmentService(req.body);
        res.status(201).json({ ...attachment, message: 'Attachment uploaded successfully' });
    } catch (error) {
        next(error);
    }
};
