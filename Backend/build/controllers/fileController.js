"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fileProxy_1 = __importDefault(require("../proxies/fileProxy"));
const path = __importStar(require("path"));
const promises_1 = require("fs/promises");
class FileController {
    constructor() {
        this.uploadPath = path.join(__dirname, '../../uploads');
    }
    uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!req.body.file)
                    res.status(400).send('Archivo no proporcionado');
                const fileData = {
                    nombre: req.body.file.originalname,
                    direccionDoc: path.join(this.uploadPath, req.body.file.filename),
                    categoria: req.body.categoria
                };
                const result = yield fileProxy_1.default.uploadFile(fileData, req.body.user);
                res.status(201).json(result);
                return;
            }
            catch (error) {
                res.status(500).send('Error al subir archivo');
                return;
            }
        });
    }
    getUserFiles(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const userId = req.body.user.uid;
                const files = yield fileProxy_1.default.getFilesByUser(userId);
                res.json(files);
                return;
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener archivos del usuario' });
                return;
            }
        });
    }
    updateFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.body.user.uid;
                const updates = req.body;
                // Verificar propiedad
                const file = yield fileProxy_1.default.getFileById(id);
                if (!file) {
                    res.status(404).json({ error: 'Archivo no encontrado' });
                    return;
                }
                if (file.usuario !== userId) {
                    res.status(403).json({ error: 'No autorizado para modificar este archivo' });
                    return;
                }
                // Actualizar solo campos permitidos
                const allowedUpdates = ['nombre', 'categoria'];
                const validUpdates = {};
                for (const key of allowedUpdates) {
                    if (updates[key]) {
                        validUpdates[key] = updates[key];
                    }
                }
                const updatedFile = yield fileProxy_1.default.updateFile(id, validUpdates);
                res.json(updatedFile);
                return;
            }
            catch (error) {
                res.status(500).json({ error: 'Error al actualizar el archivo' });
                return;
            }
        });
    }
    // controllers/fileController.ts
    deleteFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const userId = req.body.user.uid;
                const file = yield fileProxy_1.default.getFileById(id);
                // Verificación explícita de null
                if (!file) {
                    res.status(404).json({ error: 'Archivo no encontrado' });
                    return;
                }
                // Ahora TypeScript sabe que file no es null
                if (file.usuario !== userId) {
                    res.status(403).json({ error: 'No autorizado para eliminar este archivo' });
                    return;
                }
                yield (0, promises_1.unlink)(file.direccionDoc);
                yield fileProxy_1.default.deleteFile(id);
                res.json({ message: 'Archivo eliminado correctamente' });
                return;
            }
            catch (error) {
                res.status(500).json({ error: 'Error al eliminar el archivo' });
                return;
            }
        });
    }
}
exports.default = new FileController();
