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
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = exports.login = exports.register = void 0;
// controllers/authController.ts
const admin = __importStar(require("firebase-admin"));
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const user = yield admin.auth().createUser({ email, password });
        res.status(201).json({ uid: user.uid, email: user.email });
        return;
    }
    catch (error) {
        res.status(400).send('Error al crear usuario');
        return;
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400).json({ error: 'Email y contraseña requeridos' });
        return;
    }
    try {
        // 1. Verificar credenciales con Firebase Authentication
        const user = yield admin.auth().getUserByEmail(email);
        // 2. Generar token personalizado
        const token = yield admin.auth().createCustomToken(user.uid);
        // 3. Responder con el token
        res.json({
            uid: user.uid,
            email: user.email,
            token
        });
        return;
    }
    catch (error) {
        handleAuthError(error, res);
        return;
    }
});
exports.login = login;
// Manejo de errores específicos de Firebase
const handleAuthError = (error, res) => {
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
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const token = ((_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split('Bearer ')[1]) || "";
    if (!token) {
        res.status(401).json({ error: 'Token no proporcionado' });
        return;
    }
    try {
        const decodedToken = yield admin.auth().verifyIdToken(token);
        res.json({
            uid: decodedToken.uid,
            email: decodedToken.email,
            email_verified: decodedToken.email_verified
        });
        return;
    }
    catch (error) {
        res.status(401).json({ error: 'Token inválido o expirado' });
        return;
    }
});
exports.verifyToken = verifyToken;
