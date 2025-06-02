import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    // 1. 基本校验
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. 邮箱格式校验（简单正则）
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: 'Invalid email format' });
    }

    try {
        // 3. 检查用户是否已存在
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: 'Email already registered' });
        }

        // 4. 加密密码
        const hashedPassword = await bcrypt.hash(password, 10);

        // 5. 创建新用户
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        // 6. 返回成功信息（不返回密码）
        res.status(201).json({
            message: 'User created successfully',
            user: { username, email }
        });
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}