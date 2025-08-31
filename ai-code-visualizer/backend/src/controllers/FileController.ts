// FILE: src/controllers/FileController.ts

import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { GeminiService } from '../services/geminiService';

const projectRoot = process.cwd();
const uploadsPath = path.join(projectRoot, 'uploads');

export class FileController {
    private geminiService: GeminiService;

    constructor() {
        this.geminiService = new GeminiService();
    }

    public handleUpload = (req: Request, res: Response): void => {
        res.status(200).json({ message: 'Project uploaded successfully.' });
    }

    public getFileStructure = async (req: Request, res: Response): Promise<void> => {
        try {
            if (!fs.existsSync(uploadsPath) || fs.readdirSync(uploadsPath).length === 0) {
                res.json({ summary: 'Please import a project folder to begin analysis.', mermaidDiagram: '' });
return;
            }

            // --- NEW: Robustly build context from the entire project structure ---
            let projectContext = "Analyze the following project file structure and generate a high-level architectural diagram.\n\nFILE STRUCTURE:\n";
            const filePaths: string[] = [];

            const walkDir = (dir: string) => {
                const files = fs.readdirSync(dir);
                files.forEach(file => {
                    const fullPath = path.join(dir, file);
                    const relativePath = path.relative(uploadsPath, fullPath);
                    if (fs.statSync(fullPath).isDirectory()) {
                        filePaths.push(`- ${relativePath}/ (directory)`);
                        walkDir(fullPath);
                    } else {
                        filePaths.push(`- ${relativePath}`);
                    }
                });
            };

            walkDir(uploadsPath);
            projectContext += filePaths.join('\n');
            // --- End of new context logic ---

            const analysis = await this.geminiService.getArchitecturalAnalysis(projectContext);
            res.json(analysis);

        } catch (error) {
            console.error("Failed to get architectural analysis:", error);
            res.status(500).json({ error: 'Error generating architectural analysis.' });
        }
    }
    
    // (Your other controller methods like analyzeFile and getFileContent can remain here)
}