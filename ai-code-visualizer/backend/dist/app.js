"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const index_1 = __importDefault(require("./routes/index"));
const app = (0, express_1.default)();
const PORT = parseInt(process.env.PORT || '3001', 10);
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// API routes FIRST
app.use('/api', index_1.default);
// Fix favicon warning
app.get('/favicon.ico', (req, res) => res.status(204).send());
// Serve frontend build (Vite output)
const publicPath = path_1.default.join(__dirname, '..', '..', 'frontend', 'dist');
console.log("📂 Serving frontend from:", publicPath);
app.use(express_1.default.static(publicPath));
// Catch-all route to serve React app
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(publicPath, 'index.html'));
});
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
// Example API call in frontend
const code = "example code snippet"; // Declare and initialize the 'code' variable
fetch("http://localhost:3001/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code }),
});
