"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_1 = require("../controllers/authController");
const router = express_1.default.Router();
//Registro de Usuarios
router.post('/register', authController_1.register);
// Inicio de sesión
router.post('/login', authController_1.login);
// Verificación de token
router.get('/verify', authController_1.verifyToken);
exports.default = router;
