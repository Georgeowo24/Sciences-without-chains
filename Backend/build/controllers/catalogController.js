"use strict";
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
const fileModel_1 = __importDefault(require("../models/fileModel"));
class CatalogController {
    // Obtener todos los documentos (paginados)
    getAllDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const iterator = yield fileProxy_1.default.getAllDocuments();
                const results = [];
                let count = 0;
                while (iterator.hasNext() && count < page * limit) {
                    const doc = iterator.next();
                    if (count >= (page - 1) * limit) {
                        results.push(doc);
                    }
                    count++;
                }
                res.json({
                    page,
                    totalPages: Math.ceil(count / limit),
                    documents: results
                });
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener documentos' });
            }
        });
    }
    // Obtener documentos por categoría
    getDocumentsByCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { category } = req.params;
                const iterator = yield fileProxy_1.default.getFilesByCategory(category);
                const results = [];
                while (iterator.hasNext()) {
                    results.push(iterator.next());
                }
                res.json(results);
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener documentos por categoría' });
            }
        });
    }
    // Buscar documentos
    searchDocuments(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const term = req.query.term;
                if (!term) {
                    res.status(400).json({ error: 'Término de búsqueda requerido' });
                    return;
                }
                const iterator = yield fileProxy_1.default.searchDocuments(term);
                const results = [];
                while (iterator.hasNext()) {
                    results.push(iterator.next());
                }
                res.json(results);
                return;
            }
            catch (error) {
                res.status(500).json({ error: 'Error en la búsqueda' });
                return;
            }
        });
    }
    // Obtener detalles de un documento
    getDocumentDetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const document = yield fileModel_1.default.getFileById(id);
                if (!document) {
                    res.status(404).json({ error: 'Documento no encontrado' });
                    return;
                }
                res.json(document);
                return;
            }
            catch (error) {
                res.status(500).json({ error: 'Error al obtener el documento' });
                return;
            }
        });
    }
}
exports.default = new CatalogController();
