// controllers/authController.ts
import * as admin from 'firebase-admin';
import { Request, Response } from 'express';


export const register = async (req: Request, res: Response) : Promise <void>=> {
    const {email, password } = req.body;
    
    try {
        const user = await admin.auth().createUser({ email, password });
        res.status(201).json({ uid: user.uid, email: user.email });
        return ;
    } catch (error) {
        console.log(error)
        res.status(400).send(`Error: ${error}`);
        return ;
    }
};


// controllers/authController.ts
export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const FIREBASE_WEB_API_KEY = process.env.FIREBASE_WEB_API_KEY;

    try {
        const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${FIREBASE_WEB_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email,
                password,
                returnSecureToken: true
            })
        });

        const data = await response.json();

        if (!response.ok) {
        throw new Error(data.error.message);
        }

        // 2. Devolver tokens
        res.json({
            uid: data.localId,
            email: data.email,
            token: data.idToken,
            refreshToken: data.refreshToken
        });
    } catch (error: any) {
        handleAuthError(error.response.data.error, res);
    }
};

// Helper para manejar errores
const handleAuthError = (error: any, res: Response) => {
    const errorMap: Record<string, number> = {
        EMAIL_NOT_FOUND: 404,
        INVALID_PASSWORD: 401,
        USER_DISABLED: 403,
    };

    const status = errorMap[error.message] || 400;
    res.status(status).json({ error: error.message });
};

// Manejo de errores específicos de Firebase

export const verifyToken = async (req: Request, res: Response): Promise<void> => {
    const token = req.headers.authorization?.split('Bearer ')[1] || "";
    
    if (!token) {
        res.status(401).json({ error: 'Token no proporcionado' });
        return ;
    }

    try {
        const decodedToken = await admin.auth().verifyIdToken(token);
        res.json({
        uid: decodedToken.uid,
        email: decodedToken.email,
        email_verified: decodedToken.email_verified
        });
        return ;
    } catch (error) {
        console.log(error)
        res.status(401).json({ error: 'Token inválido o expirado' });
        return ;
    }
};