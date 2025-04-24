import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_AI_API_BASE_URL;

export const generateContent = async (input, contentType) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/generate`, {
            input,
            contentType,
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Generation failed');
    }
};
