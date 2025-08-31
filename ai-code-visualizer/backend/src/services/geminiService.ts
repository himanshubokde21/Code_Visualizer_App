// FILE: src/services/geminiService.ts

import { GoogleGenerativeAI } from '@google/generative-ai';

export class GeminiService {
    private model: any;

    constructor() {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            throw new Error("GEMINI_API_KEY is not set.");
        }
        const genAI = new GoogleGenerativeAI(apiKey);
        // ---> FIX: Corrected the model name below
        this.model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    }

    public async getArchitecturalAnalysis(context: string): Promise<any> {
        const prompt = `
            Analyze the provided project context. Your response MUST be a valid JSON object
            with two keys: "summary" (a 1-2 sentence project summary) and "mermaidDiagram"
            (a Mermaid.js 'graph TD' syntax for a high-level architectural diagram).
            
            CONTEXT:
            ${context}
        `;

        const result = await this.model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        
        const startIndex = text.indexOf('{');
        const endIndex = text.lastIndexOf('}');
        const jsonString = text.substring(startIndex, endIndex + 1);
        
        return JSON.parse(jsonString);
    }
}