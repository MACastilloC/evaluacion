import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCh5emTApGGVOS5q9f29VU_60CjSvo4IZ0",
  authDomain: "eva4-8e1fb.firebaseapp.com",
  projectId: "eva4-8e1fb",
  storageBucket: "eva4-8e1fb.firebasestorage.app",
  messagingSenderId: "409956371962",
  appId: "1:409956371962:web:aba563ef1eebcc1a0e2843"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);