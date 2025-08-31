import express from 'express';
import cors from 'cors';
import path from 'path';
import apiRoutes from './routes/index'; // Import your router

const app = express();
const PORT = parseInt(process.env.PORT || "3001", 10);

app.use(cors());
app.use(express.json());

const publicPath = path.join(process.cwd(), 'public');
app.use(express.static(publicPath));

// in src/app.ts

// ---> ADD THIS LINE <---
app.get('/favicon.ico', (req, res) => res.status(204).send());

// ... rest of your file

// This line tells your server to use the router for any path starting with /api
app.use('/api', apiRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});