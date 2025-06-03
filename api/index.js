import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/user.route.js';
import authRoutes from './routes/auth.route.js';


dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

    
// Initialize Express app
const app = express();
app.use(express.json());
app.use(cookieParser());

app.listen(3000, () => {
    console.log('Server is running on port 3000!!!');
});
app.use('/user', userRoutes);
app.use('/auth', authRoutes);



app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = 'Internal Server Error';
    return res.status(statusCode).json({
        status: 'error',
        statusCode,
        message
    });
});