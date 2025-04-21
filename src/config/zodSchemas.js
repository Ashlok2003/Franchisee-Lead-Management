import { z } from 'zod';

export const LeadSchema = z.object({
    id: z.number(),
    email_id: z.string().email().optional(),
    contact_number: z.string().optional(),
    status: z.enum(['Pending', 'Needs-Verification', 'Verified', 'Invalid-Data']),
});

export const BulkVerificationSchema = z.object({
    options: z.object({
        email: z.boolean(),
        phone: z.boolean(),
        duplicate: z.boolean(),
        data: z.boolean(),
    }),
    leads: z.array(leadSchema).nonempty(),
});
