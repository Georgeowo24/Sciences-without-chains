// routes/catalogRoutes.ts
import express from 'express';
import catalogController from '../controllers/catalogController';

const router = express.Router();

// Obtener todos los documentos (paginados)
router.get('/', catalogController.getAllDocuments);

// Obtener documentos por categoría
router.get('/category/:category', catalogController.getDocumentsByCategory);

// Buscar documentos por término
router.get('/search/:term', catalogController.searchDocuments);

// Obtener detalles de un documento específico
router.get('/:id', catalogController.getDocumentDetails);

export default router;