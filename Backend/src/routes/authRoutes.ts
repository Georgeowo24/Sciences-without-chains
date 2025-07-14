import express from 'express';
import { register,login,verifyToken } from '../controllers/authController';


const router = express.Router();

//Registro de Usuarios
router.post('/register', register);

// Inicio de sesión
router.post('/login', login );

// Verificación de token
router.get('/verify', verifyToken);

export default router;