"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/fileRoutes.ts
const express_1 = __importDefault(require("express"));
const fileController_1 = __importDefault(require("../controllers/fileController"));
const authMiddlawere_1 = require("../middlewares/authMiddlawere");
const router = express_1.default.Router();
// Middleware de autenticación para todas estas rutas
router.use(authMiddlawere_1.authenticate);
// Subir archivo
router.post('/upload', fileController_1.default.uploadFile);
// Obtener archivos del usuario actual
router.get('/my-files', fileController_1.default.getUserFiles);
// Actualizar información de un archivo
router.put('/:id', fileController_1.default.updateFile);
// Eliminar un archivo
router.delete('/:id', fileController_1.default.deleteFile);
exports.default = router;
