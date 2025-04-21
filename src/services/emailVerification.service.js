import { LeadSchema } from '../config/zodSchemas.js';

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


