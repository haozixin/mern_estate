import User from '../models/user.model.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    // 1. Basic verification
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Email format validation (simple regular expression)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        // 3. Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            console.log('Email already registered');
            return res.status(409).json({ message: 'Email already registered' });
        }

        // 4. encrypted password
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. Create a new user
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // 6. Return success information (do not return the password)
        res.status(201).json({
            message: 'User created successfully',
            user: { username, email }
        });
    } catch (error) {
        console.log('Error creating user:', error);
        
        if (error.code === 11000) {

            if (error.keyPattern && error.keyPattern.email) {
                return res.status(409).json({ message: 'Email already registered' });
            } else if (error.keyPattern && error.keyPattern.username) {
                return res.status(409).json({ message: 'Username already taken' });
            } else {
                return res.status(409).json({ message: 'User already exists' });
            }
        }
        
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    // 1. 基本验证
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // 2. 邮箱格式验证
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        // 3. 查找用户
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 4. 验证密码
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // 5. 生成 JWT token
        const token = jwt.sign(
            { 
                id: user._id,
                email: user.email,
                username: user.username
            },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // 6. 设置 httpOnly cookie 并返回用户信息
        const { password: hashedPassword, ...userInfo } = user._doc;
        
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        }).status(200).json({
            message: 'Login successful',
            user: userInfo
        });

    } catch (error) {
        console.log('Error during signin:', error);
        next(error);
    }
}