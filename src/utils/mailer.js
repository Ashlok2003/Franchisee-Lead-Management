import 'dotenv/config';
import nodemailer from 'nodemailer';

export const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

export const sendEmail = async (to, subject, html, attachments = []) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
        attachments,
    };
    await transporter.sendMail(mailOptions);
};
