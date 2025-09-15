"use strict";
// FILE: src/controllers/FileController.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileController = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const geminiService_1 = require("../services/geminiService");
const projectRoot = process.cwd();
const uploadsPath = path_1.default.join(projectRoot, 'uploads');
class FileController {
    constructor() {
        this.handleUpload = (req, res) => {
            res.status(200).json({ message: 'Project uploaded successfully.' });
        };
        this.getFileStructure = async (req, res) => {
            try {
                if (!fs_1.default.existsSync(uploadsPath) || fs_1.default.readdirSync(uploadsPath).length === 0) {
                    res.json({ summary: 'Please import a project folder to begin analysis.', mermaidDiagram: '' });
                    return;
                }
                // --- NEW: Robustly build context from the entire project structure ---
                let projectContext = "Analyze the following project file structure and generate a high-level architectural diagram.\n\nFILE STRUCTURE:\n";
                const filePaths = [];
                const walkDir = (dir) => {
                    const files = fs_1.default.readdirSync(dir);
                    files.forEach(file => {
                        const fullPath = path_1.default.join(dir, file);
                        const relativePath = path_1.default.relative(uploadsPath, fullPath);
                        if (fs_1.default.statSync(fullPath).isDirectory()) {
                            filePaths.push(`- ${relativePath}/ (directory)`);
                            walkDir(fullPath);
                        }
                        else {
                            filePaths.push(`- ${relativePath}`);
                        }
                    });
                };
                walkDir(uploadsPath);
                projectContext += filePaths.join('\n');
                // --- End of new context logic ---
                const analysis = await this.geminiService.getArchitecturalAnalysis(projectContext);
                res.json(analysis);
            }
            catch (error) {
                console.error("Failed to get architectural analysis:", error);
                res.status(500).json({ error: 'Error generating architectural analysis.' });
            }
        };
        this.geminiService = new geminiService_1.GeminiService();
    }
}
exports.FileController = FileController;
