import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';
import path from 'path';
import cors from 'cors';


dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });


    const __dirname = path.resolve();
    
// Initialize Express app
const app = express();


app.use(cors({
  origin: 'https://mern-estate-jade.vercel.app', // 本地开发环境前端端口
  credentials: true                // 如果你前端 fetch 带 cookie，需要这个
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!!!`);
});
app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);


app.use(express.static(path.join(__dirname, '/client/dist')));

app.use((req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
  });

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = 'Internal Server Error';
    return res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
});