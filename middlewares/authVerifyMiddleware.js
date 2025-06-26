import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();


const JWT_SECRET =  process.env.JWT_SECRET; // Same secret as used in Auth Service

export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'No token provided',
            data: null,
            error: 'Missing JWT in Authorization header',
        });    }

    const token = authHeader.split(' ')[1];


    try {
        req.user = jwt.verify(token, JWT_SECRET);
        next();
    } catch (err) {
        return res.status(403).json({
            message: 'Token Invalid',
            data: null,
            error: err.message,
        });    }
};
