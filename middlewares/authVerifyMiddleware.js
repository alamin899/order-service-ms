import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const AUTH_SERVICE_URL = process.env.AUTH_SERVICE_URL;

export const verifyToken = async (req, res, next) => {

    const authHeader = req.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const response = await axios.get(`${AUTH_SERVICE_URL}/api/auth/verify-token`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        req.user = response.data.data;
        next();
    } catch (err) {
        console.error('Token verification failed:', err?.response?.data || err.message);
        return res.status(403).json({ message: 'Invalid token' });
    }
};
