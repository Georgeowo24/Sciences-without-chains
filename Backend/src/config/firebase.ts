import * as admin from 'firebase-admin';

class FirebaseAdmin {
    private static instance: FirebaseAdmin;
    public firestore: admin.firestore.Firestore;

    private constructor() {
    admin.initializeApp({
        credential: admin.credential.applicationDefault()
    });
    this.firestore = admin.firestore();
    }

    public static getInstance(): FirebaseAdmin {
        if (!FirebaseAdmin.instance) {
            FirebaseAdmin.instance = new FirebaseAdmin();
        }
        return FirebaseAdmin.instance;
    }
}

export default FirebaseAdmin.getInstance();