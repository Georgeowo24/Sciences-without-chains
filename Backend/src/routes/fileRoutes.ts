// routes/fileRoutes.ts
import express from 'express';
import fileController from '../controllers/fileController';
import { authenticate } from '../middlewares/authMiddlawere';

const router = express.Router();

// Middleware de autenticación para todas estas rutas
router.use(authenticate);

// Subir archivo
router.post('/upload', fileController.uploadFile);

// Obtener archivos del usuario actual
router.get('/my-files', fileController.getUserFiles);

// Actualizar información de un archivo
router.put('/:id', fileController.updateFile);

// Eliminar un archivo
router.delete('/:id', fileController.deleteFile);

export default router;