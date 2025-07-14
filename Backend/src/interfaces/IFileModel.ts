// interfaces/IFileModel.ts
import IArchivo from './IArchivo'; // Asumiendo que tienes esta interfaz

export default interface IFileModel {
    createFile(fileData: Partial<IArchivo>): Promise<IArchivo>;
    getFilesByCategory(category: string): Promise<IArchivo[]>;
    getFileById(id: string): Promise<IArchivo | null>;
    getFilesByUser(userId: string): Promise<IArchivo[]>;
    updateFile(id: string, updates: Record<string, any>): Promise<IArchivo | null>;
    deleteFile(id: string): Promise<void>;
    searchDocuments(term: string): Promise<IArchivo[]>;
    getAllDocuments(): Promise<IArchivo[]>;
}