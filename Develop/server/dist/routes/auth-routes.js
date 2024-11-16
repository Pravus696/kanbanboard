import { Router } from 'express';
import { User } from '../models/user.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
// Secret key for JWT
const secretKey = process.env.JWT_SECRET_KEY || 'secret';
export const login = async (req, res) => {
    // TODO: If the user exists and the password is correct, return a JWT token
    console.log(req.body);
    const { username, password } = req.body;
    try {
        // Check if the user exists
        const user = await User.findOne({ where: { username } });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Check if the password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }
        // Create a JWT token
        const token = jwt.sign({ user: user }, secretKey, { expiresIn: '1h' });
        return res.json({
            message: 'Login successful',
            token, // send the token back to client
            user: username,
        });
    }
    catch (error) {
        return res.status(500).json({ message: 'Internal server error', error });
    }
};
const router = Router();
// POST /login - Login a user
router.post('/login', login);
export default router;
