import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { Voluntario } from '@/app/types/Voluntario';

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

export const voluntariosRef = collection(db, 'voluntarios');

export interface VoluntarioConId extends Voluntario {
  id: string;
}

export const obtenerVoluntarios = async (): Promise<VoluntarioConId[]> => {
  const snapshot = await getDocs(voluntariosRef);
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  } as VoluntarioConId));
};

// Función auxiliar para limpiar los datos antes de enviarlos a Firebase
const limpiarDatos = (voluntario: Voluntario) => {
  return {
    nombre: voluntario.nombre,
    experiencia: voluntario.experiencia === '' ? 0 : Number(voluntario.experiencia),
    rol: voluntario.rol,
    comentarios: voluntario.comentarios || '',
    fecha: voluntario.fecha
  };
};

export const agregarVoluntario = async (voluntario: Voluntario): Promise<void> => {
  const datosLimpios = limpiarDatos(voluntario);
  await addDoc(voluntariosRef, datosLimpios);
};

export const actualizarVoluntario = async (id: string, voluntario: Voluntario): Promise<void> => {
  const ref = doc(db, 'voluntarios', id);
  const datosLimpios = limpiarDatos(voluntario);
  await updateDoc(ref, datosLimpios);
};

export const eliminarVoluntario = async (id: string): Promise<void> => {
  const ref = doc(db, 'voluntarios', id);
  await deleteDoc(ref);
};