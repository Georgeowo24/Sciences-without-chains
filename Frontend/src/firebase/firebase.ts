import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBMvYG1FcCbu96XXs5eZGST2SxgWuh0Oxs",
  authDomain: "sciencewchainsdb.firebaseapp.com",
  projectId: "sciencewchainsdb",
  storageBucket: "sciencewchainsdb.firebasestorage.app",
  messagingSenderId: "17935578944",
  appId: "1:17935578944:web:8c5ec1a400aa44bcdceca5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;