"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ai-code-visualizer/backend/src/app.ts
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3001', 10);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// --- API routes will remain at /api ---
app.use('/api', index_1.default);
// --- Serve your static UI from the 'public' folder ---
// This is the new block that serves your preferred UI
const publicPath = path_1.default.join(__dirname, '..', 'public');
app.use(express_1.default.static(publicPath));
// For any other GET request, serve the index.html file
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(publicPath, 'index.html'));
});
// --- End of new UI block ---
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server and UI running at http://localhost:${PORT}`);
});
