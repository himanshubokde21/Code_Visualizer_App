// FILE: src/routes/index.ts

import { Router } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { FileController } from '../controllers/FileController';

const router = Router();
const fileController = new FileController();

// --- Multer Configuration ---
const uploadsPath = path.join(process.cwd(), 'uploads');

// Helper to clear directory before an upload
const clearUploadsDirectory = () => {
    if (fs.existsSync(uploadsPath)) {
        fs.rmSync(uploadsPath, { recursive: true, force: true });
    }
    fs.mkdirSync(uploadsPath, { recursive: true });
};

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        // Use the file's original path to recreate the folder structure
        const dir = path.join(uploadsPath, path.dirname(file.originalname));
        fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, path.basename(file.originalname));
    },
});
const upload = multer({ storage });

// --- API Routes ---
router.get('/structure', fileController.getFileStructure);

// NEW: This route handles the project upload
router.post('/upload', (req, res, next) => {
    clearUploadsDirectory(); // Clear old project before uploading new one
    next();
}, upload.array('projectFiles'), fileController.handleUpload);

export default router;