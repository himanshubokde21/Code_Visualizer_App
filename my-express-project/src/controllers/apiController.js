// This file contains the API controller functions for handling requests and interacting with the generative AI service.

const generativeAiService = require('../services/generativeAiService');

exports.generateResponse = async (req, res) => {
    try {
        const { prompt } = req.body;
        const response = await generativeAiService.getAiResponse(prompt);
        res.status(200).json({ response });
    } catch (error) {
        console.error('Error generating response:', error);
        res.status(500).json({ error: 'An error occurred while generating the response.' });
    }
};