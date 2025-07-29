"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/catalogRoutes.ts
const express_1 = __importDefault(require("express"));
const catalogController_1 = __importDefault(require("../controllers/catalogController"));
const router = express_1.default.Router();
// Obtener todos los documentos (paginados)
router.get('/', catalogController_1.default.getAllDocuments);
// Obtener documentos por categoría
router.get('/category/:category', catalogController_1.default.getDocumentsByCategory);
// Buscar documentos por término
router.get('/search', catalogController_1.default.searchDocuments);
// Obtener detalles de un documento específico
router.get('/:id', catalogController_1.default.getDocumentDetails);
exports.default = router;
