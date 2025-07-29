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
const firebase_1 = __importDefault(require("../config/firebase"));
class FileModel {
    constructor() {
        this.db = firebase_1.default.firestore;
    }
    //Crear Archivo
    createFile(fileData) {
        return __awaiter(this, void 0, void 0, function* () {
            const docRef = yield this.db.collection('archivos').add(fileData);
            return {
                id: docRef.id,
                categoria: fileData.categoria || '', // Asegura valor por defecto
                direccionDoc: fileData.direccionDoc || '',
                nombre: fileData.nombre || '',
                usuario: fileData.usuario || ''
            };
        });
    }
    //Obtener archivos por categoría
    getFilesByCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield this.db.collection('archivos')
                .where('categoria', '==', category)
                .get();
            return snapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    categoria: data.categoria || '', // Asegura valor por defecto
                    direccionDoc: data.direccionDoc || '',
                    nombre: data.nombre || '',
                    usuario: data.usuario || ''
                };
            });
        });
    }
    //Obtener archivo por id
    getFileById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const doc = yield this.db.collection('archivos').doc(id).get();
            if (!doc.exists)
                return null;
            const data = doc.data();
            return {
                id: doc.id,
                categoria: (data === null || data === void 0 ? void 0 : data.categoria) || '',
                direccionDoc: (data === null || data === void 0 ? void 0 : data.direccionDoc) || '',
                nombre: (data === null || data === void 0 ? void 0 : data.nombre) || '',
                usuario: (data === null || data === void 0 ? void 0 : data.usuario) || ''
            };
        });
    }
    // Obtener archivos por usuario
    getFilesByUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield this.db.collection('archivos')
                .where('usuario', '==', userId)
                .get();
            return snapshot.docs.map(doc => ({
                id: doc.id,
                categoria: doc.data().categoria,
                direccionDoc: doc.data().direccionDoc,
                nombre: doc.data().nombre,
                usuario: doc.data().usuario
            }));
        });
    }
    // Actualizar archivo
    updateFile(id, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.collection('archivos').doc(id).update(updates);
            return this.getFileById(id);
        });
    }
    // Eliminar archivo
    deleteFile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.db.collection('archivos').doc(id).delete();
        });
    }
    // Buscar documentos
    searchDocuments(term) {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield this.db.collection('archivos').get();
            const termLower = term.toLowerCase();
            return snapshot.docs
                .map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    categoria: data.categoria || '', // Asegura valor por defecto
                    direccionDoc: data.direccionDoc || '',
                    nombre: data.nombre || '',
                    usuario: data.usuario || ''
                };
            })
                .filter(doc => doc.nombre.toLowerCase().includes(termLower) ||
                doc.categoria.toLowerCase().includes(termLower));
        });
    }
    // Obtener todos los documentos
    getAllDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            const snapshot = yield this.db.collection('archivos').get();
            return snapshot.docs
                .map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    categoria: data.categoria || '', // Asegura valor por defecto
                    direccionDoc: data.direccionDoc || '',
                    nombre: data.nombre || '',
                    usuario: data.usuario || ''
                };
            });
        });
    }
}
exports.default = new FileModel();
