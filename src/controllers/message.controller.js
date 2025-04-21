import { scheduleMessagesService, sendMessagesService } from '../services/message.service.js';

export const sendMessagesController = async (req, res, next) => {
    try {
        const { promotion_id, lead_ids, type, content } = req.body;
        const results = await sendMessagesService({
            promotion_id,
            lead_ids,
            type,
            content,
        });
        res.status(201).json({ message: 'Messages sent successfully', results });
    } catch (error) {
        next(error);
    }
};

export const scheduleMessagesController = async (req, res, next) => {
    try {
        const result = await scheduleMessagesService(req.body);
        res.status(201).json({ message: 'Messages scheduled successfully', ...result });
    } catch (error) {
        next(error);
    }
};
