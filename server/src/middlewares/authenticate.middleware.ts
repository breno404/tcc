import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express'



const authMiddleware = (req: Request) => {
    const token = req.headers.authorization || '';
    const SECRET = 'tcc2023'
    try {
        if (token) {
            const user = jwt.verify(token, SECRET);
            return { user }
        }
    } catch (error) {
        throw new Error('Token inválido');
    }
};

export default authMiddleware