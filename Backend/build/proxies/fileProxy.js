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
const iterator_1 = __importDefault(require("../utils/iterator"));
class FileProxy {
    constructor(fileModel) {
        this.fileModel = fileModel;
    }
    uploadFile(fileData, user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validaciones adicionales
            if (!fileData.nombre || !fileData.categoria) {
                throw new Error('Nombre y categoría son requeridos');
            }
            return this.fileModel.createFile(Object.assign(Object.assign({}, fileData), { usuario: user.uid }));
        });
    }
    getFilesByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.fileModel.getFilesByCategory(category);
            return new iterator_1.default(files);
        });
    }
    getFilesByUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.fileModel.getFilesByUser(id);
            return new iterator_1.default(files);
        });
    }
    getFileById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.fileModel.getFileById(id);
            return file;
        });
    }
    updateFile(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            const file = yield this.fileModel.updateFile(id, updates);
            return file;
        });
    }
    // Eliminar archivo
    deleteFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.fileModel.deleteFile(id);
        });
    }
    // Buscar documentos
    searchDocuments(term) {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.fileModel.searchDocuments(term);
            return new iterator_1.default(files);
        });
    }
    // Obtener todos los documentos
    getAllDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            const files = yield this.fileModel.getAllDocuments();
            return new iterator_1.default(files);
        });
    }
}
const fileModel_1 = __importDefault(require("../models/fileModel"));
exports.default = new FileProxy(fileModel_1.default);
