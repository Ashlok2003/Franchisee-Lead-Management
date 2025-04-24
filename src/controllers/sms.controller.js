import { sendSMS } from '../services/sms.service.js';

const generateOTP = (length = 6) => {
    const characters = '0123456789';
    let otp = '';

    for (let i = 0; i < length; i++) {
        otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return otp;
};

export default generateOTP;

export const sendOTP = async (req, res) => {
    const { phone } = req.body;

    const otp = generateOTP();
    await sendSMS(phone, otp);

    if (otp) {
        res.status(200).json({ message: 'OTP sent successfully' });
    } else {
        res.status(500).json({ message: 'Failed to send OTP' });
    }
};
