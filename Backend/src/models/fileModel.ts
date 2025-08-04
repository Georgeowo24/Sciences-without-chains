import firebaseAdmin from '../config/firebase';
import IArchivo from '../interfaces/IArchivo';
import IFileModel from '../interfaces/IFileModel';

class FileModel implements IFileModel {
    private db = firebaseAdmin.firestore;

    //Crear Archivo
    async createFile(fileData: Partial<IArchivo>): Promise<IArchivo> {
        const docRef = await this.db.collection('archivos').add(fileData);
        return {
            id: docRef.id,
            categoria: fileData.categoria || '', // Asegura valor por defecto
            direccionDoc: fileData.direccionDoc || '',
            descripcion: fileData.descripcion || '', // Asegura valor por defecto
            nombre: fileData.nombre || '',
            usuario: fileData.usuario || ''
        };
    }

    //Obtener archivos por categoría
    async getFilesByCategory(category: string) {
        const snapshot = await this.db.collection('archivos')
        .where('categoria', '==', category)
        .get();
        
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                categoria: data.categoria || '', // Asegura valor por defecto
                direccionDoc: data.direccionDoc || '',
                descripcion: data.descripcion || '', // Asegura valor por defecto
                nombre: data.nombre || '',
                usuario: data.usuario || ''
            };
        });
    }

    //Obtener archivo por id
    async getFileById(id: string): Promise<IArchivo | null> {
        const doc = await this.db.collection('archivos').doc(id).get();
        
        if (!doc.exists) return null;

        const data = doc.data();
        return {
            id: doc.id,
            categoria: data?.categoria || '',
            direccionDoc: data?.direccionDoc || '',
            descripcion: data?.descripcion || '', // Asegura valor por defecto
            nombre: data?.nombre || '',
            usuario: data?.usuario || ''
        };
    }

    // Obtener archivos por usuario
    async getFilesByUser(userId: string): Promise<IArchivo[]> {
        const snapshot = await this.db.collection('archivos')
            .where('usuario', '==', userId)
            .get();
        
        return snapshot.docs.map(doc => ({
            id: doc.id,
            categoria: doc.data().categoria,
            direccionDoc: doc.data().direccionDoc,
            descripcion: doc.data().descripcion || '', // Asegura valor por defecto
            nombre: doc.data().nombre,
            usuario: doc.data().usuario
        }));
    }

    // Actualizar archivo
    async updateFile(id: string, updates: Record<string, any>) {
        await this.db.collection('archivos').doc(id).update(updates);
        return this.getFileById(id);
    }

     // Eliminar archivo
    async deleteFile(id: string) {
        await this.db.collection('archivos').doc(id).delete();
    }

    // Buscar documentos
    async searchDocuments(term: string): Promise<IArchivo[]> {
        const snapshot = await this.db.collection('archivos').get();
        const termLower = term.toLowerCase();
        
        return snapshot.docs
            .map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                categoria: data.categoria || '', // Asegura valor por defecto
                direccionDoc: data.direccionDoc || '',
                descripcion: data.descripcion || '', // Asegura valor por defecto
                nombre: data.nombre || '',
                usuario: data.usuario || ''
            };
            })
            .filter(doc => 
            doc.nombre.toLowerCase().includes(termLower) || 
            doc.categoria.toLowerCase().includes(termLower)
            );
    }

    // Obtener todos los documentos
    async getAllDocuments() {
        const snapshot = await this.db.collection('archivos').get();
        return snapshot.docs
            .map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                categoria: data.categoria || '', // Asegura valor por defecto
                direccionDoc: data.direccionDoc || '',
                descripcion: data.descripcion || '', // Asegura valor por defecto
                nombre: data.nombre || '',
                usuario: data.usuario || ''
            };
            });
    }
}

export default new FileModel();