import { generateContent } from '@/services/aiService';
import { useState } from 'react';

export const useAIAssistant = () => {
    const [isGenerating, setIsGenerating] = useState(false);
    const [generationError, setGenerationError] = useState(null);

    const handleGenerate = async (input, contentType) => {
        try {
            setIsGenerating(true);
            setGenerationError(null);
            const result = await generateContent(input, contentType);
            return result;
        } catch (error) {
            setGenerationError(error.message);
            throw error;
        } finally {
            setIsGenerating(false);
        }
    };

    return { handleGenerate, isGenerating, generationError, setIsGenerating };
};
