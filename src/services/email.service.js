import disposable from 'disposable-email';
import 'dotenv/config.js';
import { LeadSchema } from '../config/zodSchemas.js';
import hasMXRecords from '../utils/dnsChecker.js';
import { transporter } from '../utils/mailer.js';

export const verifyEmails = async (
    leads,
    results = {
        processed: 0,
        successful: 0,
        failed: 0,
        emailResults: [],
    }
) => {
    for (const lead of leads) {
        try {
            const validLead = LeadSchema.parse(lead);
            const verificationResult = await verifySingleEmail(validLead);

            await storeResultsInDB(validLead, verificationResult);

            results.emailResults.push({ ...verificationResult, email: validLead.email });
            results.successful++;
        } catch (error) {
            handleVerificationError(error, lead, results);
        } finally {
            results.processed++;
        }
    }

    return results;
};

export const validateEmail = async (email) => {
    const domain = email.split('@')[1].toLowerCase();

    if (!disposable.validate(domain)) {
        return {
            valid: false,
            reason: 'Disposable email address not allowed',
        };
    }

    const mx = await hasMXRecords(domain);
    if (!mx) {
        return {
            valid: false,
            reason: 'Email domain has no MX records',
        };
    }

    return { valid: true };
};

export const sendOTP = async (email, otp) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Admin Login OTP',
        text: `Your OTP for Admin Login is: ${otp}. Valid for 2 minutes.`,
    };

    try {
        await transporter.sendMail(mailOptions);
    } catch (error) {
        console.error('Nodemailer error:', error);
        throw error;
    }
};
