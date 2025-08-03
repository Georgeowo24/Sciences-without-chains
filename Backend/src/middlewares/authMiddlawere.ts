// middlewares/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const token = req.headers.authorization?.split('Bearer ')[1];
    if (!token) {
        res.status(401).json({ error: 'Acceso no autorizado' });
        return ;
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        req.body.user = {
        uid: decodedToken.uid,
        email: decodedToken.email || ''
        };
        next();
        return ;
    } catch (error) {
        res.status(401).json({ error: 'Token inválido' });
        return ;
    }
};