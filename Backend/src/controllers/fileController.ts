import { Request, Response } from 'express';
import FileProxy from '../proxies/fileProxy';
import * as path from 'path';
import { unlink } from 'fs/promises';

// Importa el tipo UploadedFile de express-fileupload
import { UploadedFile } from 'express-fileupload';

class FileController {
    private uploadPath = path.join(__dirname, '../../uploads');

    constructor() {
        this.uploadFile = this.uploadFile.bind(this);
        this.getUserFiles = this.getUserFiles.bind(this);
        this.updateFile = this.updateFile.bind(this);
        this.deleteFile = this.deleteFile.bind(this);
    }

    async uploadFile(req: Request, res: Response): Promise<void> {
        try {
            if (!req.files || !req.files.file || !req.body.categoria) {
                return res.status(400).send('Archivo no proporcionado');
            }

            const file = req.files.file as UploadedFile;

            const uploadPath = path.join(this.uploadPath, file.name);
            await file.mv(uploadPath);

            // Guarda la ruta pública, no la absoluta
            const direccionDoc = `/uploads/${file.name}`;

            const fileData = {
                nombre: req.body.nombre || file.name,
                direccionDoc, // <-- ahora es la ruta pública
                descripcion: req.body.descripcion || 'No description provided',
                categoria: req.body.categoria
            };

            const result = await FileProxy.uploadFile(fileData, req.body.user);
            return res.status(201).json(result);
        } catch (error) {
            console.error('Error al subir archivo:', error);
            if (!res.headersSent) {
                return res.status(500).send('Error al subir archivo');
            }
            return res.status(500).send("Error")
        }
    }

    async getUserFiles(req: Request, res: Response): Promise<void>{
        try {
            const userId = req.body.user.uid;
            const files = await FileProxy.getFilesByUser(userId);
            res.json(files);
            return ;
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener archivos del usuario' });
            return ;
        }
    }

    async updateFile(req: Request, res: Response): Promise<void> {
        try {
        const { id } = req.params;
        const userId = req.body.user.uid;
        const updates = req.body;
        
        // Verificar propiedad
        const file = await FileProxy.getFileById(id);
        if (!file) {
            res.status(404).json({ error: 'Archivo no encontrado' });
            return ;
        }
        if (file.usuario !== userId) {
            res.status(403).json({ error: 'No autorizado para modificar este archivo' });
            return ;
        }
        
        // Actualizar solo campos permitidos
        const allowedUpdates = ['nombre', 'categoria'];
        const validUpdates: Record<string, string> = {};
        
        for (const key of allowedUpdates) {
            if (updates[key]) {
            validUpdates[key] = updates[key];
            }
        }
        
        const updatedFile = await FileProxy.updateFile(id, validUpdates);
        res.json(updatedFile);
        return ;
        } catch (error) {
            res.status(500).json({ error: 'Error al actualizar el archivo' });
            return ;
        }
    }



    // controllers/fileController.ts
    async deleteFile(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const userId = req.body.user.uid;
            
            const file = await FileProxy.getFileById(id);
            
            // Verificación explícita de null
            if (!file) {
                res.status(404).json({ error: 'Archivo no encontrado' });
                return ;
            }
            
            // Ahora TypeScript sabe que file no es null
            if (file.usuario !== userId) {
                res.status(403).json({ error: 'No autorizado para eliminar este archivo' });
                return ;
            }
            
            await unlink(file.direccionDoc);
            await FileProxy.deleteFile(id);
            
            res.json({ message: 'Archivo eliminado correctamente' });
            return ;
        } catch (error) {
            res.status(500).json({ error: 'Error al eliminar el archivo' });
            return ;
        }
    }
}

export default new FileController();
