// controllers/catalogController.ts
import { Request, Response } from 'express';
import FileProxy from '../proxies/fileProxy';
import FileModel from '../models/fileModel';

class CatalogController {
    // Obtener todos los documentos (paginados)
    async getAllDocuments(req: Request, res: Response) {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            
            const iterator = await FileProxy.getAllDocuments()
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
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Error al obtener documentos' });
        }
    }

    // Obtener documentos por categoría
    async getDocumentsByCategory(req: Request, res: Response) {
        try {
            const { category } = req.params;
            const iterator = await FileProxy.getFilesByCategory(category);
            
            const results = [];
            while (iterator.hasNext()) {
                results.push(iterator.next());
            }
            
            res.json(results);
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener documentos por categoría' });
        }
    }

    // Buscar documentos
    async searchDocuments(req: Request, res: Response): Promise<void> {
        try {
            const term = req.params.term as string;
            if (!term) {
                res.status(400).json({ error: 'Término de búsqueda requerido' });
                return ;
            }
            
            const iterator = await FileProxy.searchDocuments(term);
            const results = [];
            
            while (iterator.hasNext()) {
                results.push(iterator.next());
            }
            
            res.json(results);
            return ;
        } catch (error) {
            res.status(500).json({ error: 'Error en la búsqueda' });
            return ;
        }
    }

    // Obtener detalles de un documento
    async getDocumentDetails(req: Request, res: Response): Promise <void> {
        try {
            const { id } = req.params;
            const document = await FileModel.getFileById(id);
            
            if (!document) {
                res.status(404).json({ error: 'Documento no encontrado' });
                return ;
            }
            
            res.json(document);
            return ;
        } catch (error) {
            res.status(500).json({ error: 'Error al obtener el documento' });
            return ;
        }
    }
}

export default new CatalogController();