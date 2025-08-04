import express from 'express';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import authRoutes from './routes/authRoutes';
import fileRoutes from './routes/fileRoutes';
import catalogRoutes from './routes/catalogRoutes';
import './config/firebase'; // Inicializa Singleton

const app = express();

app.use(cors()) 
app.use(express.json());
app.use(fileUpload());

// Rutas públicas
app.use('/catalog', catalogRoutes);

// Rutas de autenticación
app.use('/auth', authRoutes);

// Rutas protegidas para gestión de archivos
app.use('/files', fileRoutes);

// Servir archivos estáticos (para documentos subidos)
app.use('/uploads', express.static('uploads'));


const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{
    console.log(`Server runing on port ${PORT}`)
})