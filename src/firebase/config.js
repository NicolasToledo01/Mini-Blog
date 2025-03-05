import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"; // Adicione isso para importar getAuth


const firebaseConfig = {
  apiKey: "AIzaSyAzt6Gi0zISYrITED6g4PDCPpoktFMTBL4",
  authDomain: "miniblog-2e9f4.firebaseapp.com",
  projectId: "miniblog-2e9f4",
  storageBucket: "miniblog-2e9f4.firebasestorage.app",
  messagingSenderId: "468418014417",
  appId: "1:468418014417:web:9de1a94804f58f7efee9f0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app); // aqui você obtém a instância de auth

export { db, auth };