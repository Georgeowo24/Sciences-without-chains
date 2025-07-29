// proxies/fileProxy.ts
import IFileModel from '../interfaces/IFileModel'
import DocumentIterator from '../utils/iterator';
import IArchivo from '../interfaces/IArchivo'; // Importar interfaz


class FileProxy {
    constructor(private fileModel: IFileModel) {}

    async uploadFile(fileData: Partial<IArchivo>, user: any): Promise<IArchivo> {
    // Validaciones adicionales
        if (!fileData.nombre || !fileData.categoria) {
        throw new Error('Nombre y categoría son requeridos');
        }
        
        return this.fileModel.createFile({
        ...fileData,
        usuario: user.uid
        }) as Promise<IArchivo>;
    }

    async getFilesByCategory(category: string) {
        const files = await this.fileModel.getFilesByCategory(category);
        return new DocumentIterator(files);
    }

    async getFilesByUser(id:string){
        const files = await this.fileModel.getFilesByUser(id);
        return new DocumentIterator(files);
    }

    async getFileById(id:string){
        const file = await this.fileModel.getFileById(id);
        return file;
    }

    async updateFile(id:string,updates: Record<string, any>){
        const file = await this.fileModel.updateFile(id,updates);
        return file;
    }

     // Eliminar archivo
    async deleteFile(id: string) {
        return this.fileModel.deleteFile(id)
    }

    // Buscar documentos
    async searchDocuments(term: string) {
        const files = await this.fileModel.searchDocuments(term);
        return new DocumentIterator(files);
    }

    // Obtener todos los documentos
    async getAllDocuments() {
        const files = await this.fileModel.getAllDocuments();
        return new DocumentIterator(files);
    }
}

import FileModelInstance from '../models/fileModel'
export default new FileProxy(FileModelInstance);