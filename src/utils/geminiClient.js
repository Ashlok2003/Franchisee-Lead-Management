import { GoogleGenerativeAI } from '@google/generative-ai';
import 'dotenv/config';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
    throw new Error('Missing GEMINI_API_KEY in environment variables');
}

const client = new GoogleGenerativeAI(apiKey);

const geminiModel = client.getGenerativeModel({
    model: 'gemini-2.0-flash',
    generationConfig: {
        temperature: 0.9,
        topP: 1,
        topK: 1,
        maxOutputTokens: 4096,
    },
});

export default geminiModel;
