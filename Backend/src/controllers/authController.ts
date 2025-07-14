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
        res.status(400).send('Error al crear usuario');
        return ;
    }
};


export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ error: 'Email y contraseña requeridos' });
        return ;
    }

    try {
        // 1. Verificar credenciales con Firebase Authentication
        const user = await admin.auth().getUserByEmail(email);
        
        // 2. Generar token personalizado
        const token = await admin.auth().createCustomToken(user.uid);
        
        // 3. Responder con el token
        res.json({ 
        uid: user.uid,
        email: user.email,
        token 
        });
        return ;
    } catch (error) {
        handleAuthError(error, res);
        return ;
    }
};

// Manejo de errores específicos de Firebase
const handleAuthError = (error: any, res: Response) => {
    switch (error.code) {
        case 'auth/user-not-found':
            res.status(404).json({ error: 'Usuario no registrado' });
        case 'auth/wrong-password':
            res.status(401).json({ error: 'Credenciales inválidas' });
        case 'auth/invalid-email':
            res.status(400).json({ error: 'Formato de email inválido' });
        default:
            res.status(500).json({ error: 'Error en el servidor' });
    }
};

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
        res.status(401).json({ error: 'Token inválido o expirado' });
        return ;
    }
};