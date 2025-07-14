"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const catalogRoutes_1 = __importDefault(require("./routes/catalogRoutes"));
require("./config/firebase"); // Inicializa Singleton
const app = (0, express_1.default)();
app.use((0, cors_1.default)()); //Transforma el request body a json
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)());
// Rutas públicas
app.use('/catalog', catalogRoutes_1.default);
// Rutas de autenticación
app.use('/auth', authRoutes_1.default);
// Rutas protegidas para gestión de archivos
app.use('/files', fileRoutes_1.default);
// Servir archivos estáticos (para documentos subidos)
app.use('/uploads', express_1.default.static('uploads'));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server runing on port ${PORT}`);
});
