"use strict";
// FILE: ai-code-visualizer/src/routes/index.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const FileController_1 = require("../controllers/FileController");
const router = (0, express_1.Router)();
const fileController = new FileController_1.FileController();
// --- Multer Configuration ---
const uploadsPath = path_1.default.join(process.cwd(), 'uploads');
// Helper to clear directory before an upload
const clearUploadsDirectory = () => {
    if (fs_1.default.existsSync(uploadsPath)) {
        fs_1.default.rmSync(uploadsPath, { recursive: true, force: true });
    }
    fs_1.default.mkdirSync(uploadsPath, { recursive: true });
};
const storage = multer_1.default.diskStorage({
    destination: (req, file, cb) => {
        // Use the file's original path to recreate the folder structure
        const dir = path_1.default.join(uploadsPath, path_1.default.dirname(file.originalname));
        fs_1.default.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, path_1.default.basename(file.originalname));
    },
});
const upload = (0, multer_1.default)({ storage });
// --- API Routes ---
// ✅ NEW: Add this root route for a health check
router.get('/', (req, res) => {
    res.send('AI Code Visualizer API is running!');
});
router.get('/structure', fileController.getFileStructure);
router.get('/content', fileController.getFileContent);
// Upload new project files
router.post('/upload', (req, res, next) => {
    clearUploadsDirectory(); // Clear old project before uploading new one
    next();
}, upload.array('projectFiles'), fileController.handleUpload);
// --- New Analyze Route ---
router.post('/analyze', (req, res) => {
    const { code } = req.body;
    if (!code) {
        return res.status(400).json({ error: "No code provided" });
    }
    // Example breakdown logic (replace with your AI logic later)
    const lines = code.split("\n").length;
    const words = code.split(/\s+/).filter(Boolean).length;
    res.json({
        message: "Code breakdown successful ✅",
        stats: {
            lines,
            words,
        },
        preview: code.substring(0, 100) + (code.length > 100 ? "..." : "")
    });
});
exports.default = router;
