import { generateContent } from '../services/ai.service.js';

export async function handleGenerateContent(req, res, next) {
    try {
        const { prompt } = req.body;

        if (!prompt) {
            return res.status(400).json({ success: false, message: 'Prompt is required' });
        }

        const content = await generateContent(prompt);
        res.status(200).json({ success: true, content });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message || 'Internal Server Error' });
    }
}
