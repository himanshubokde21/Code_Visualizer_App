const { GenerativeAI } = require('@google/generative-ai');

const generativeAI = new GenerativeAI({
    apiKey: process.env.GENERATIVE_AI_API_KEY,
});

const generateResponse = async (prompt) => {
    try {
        const response = await generativeAI.generate({
            prompt: prompt,
            maxTokens: 150,
        });
        return response.text;
    } catch (error) {
        console.error('Error generating AI response:', error);
        throw error;
    }
};

module.exports = {
    generateResponse,
};