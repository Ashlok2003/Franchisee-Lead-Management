import { emailSchema } from '../config/zodSchemas.js';
import { validateEmail } from '../services/email.service.js';

export const verifyEmailController = async (req, res) => {
    const parse = emailSchema.safeParse(req.body);

    if (!parse.success) {
        return res.status(400).json({
            success: false,
            message: parse.error.issues[0].message,
        });
    }

    const { email } = parse.data;
    const result = await validateEmail(email);

    if (!result.valid) {
        return res.status(400).json({
            error: result.reason,
        });
    }

    res.json({ success: true, message: 'Email is valid' });
};
