import geminiClient from '../utils/geminiClient.js';

export const generateContent = async (prompt) => {
    try {
        const result = await geminiClient.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error('Error generating content:', error);
        throw error;
    }
};
