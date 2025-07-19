import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectDB from './config/db.js';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Set view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/dist')));

// Import routes
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// Serve React app for any other routes
app.get('*', (req, res) => {
  res.render('index');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
