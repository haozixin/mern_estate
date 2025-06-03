import User from '../models/user.model.js';
import bcrypt from 'bcrypt';

export const signup = async (req, res) => {
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
        next()
    }
}