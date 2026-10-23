import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  FirestoreError,
} from 'firebase/firestore';
import type { ContactMessage, QuizAttempt, UserAccount } from '../types';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export const CONTACT_COLLECTION = 'contact_messages';
export const QUIZ_COLLECTION = 'quiz_results';
export const USERS_COLLECTION = 'registered_users';

function formatFirestoreError(error: unknown, defaultMessage: string): string {
  if (error instanceof FirestoreError) {
    if (error.code === 'permission-denied') {
      return 'Permisos insuficientes en Firestore para guardar el registro. Verifica las reglas de seguridad.';
    }
    if (error.code === 'unavailable') {
      return 'No hay conexión con el servidor de Firestore. Verifica tu red e inténtalo de nuevo.';
    }
  }
  if (error instanceof Error && error.message) {
    return error.message;
  }
  return defaultMessage;
}

export async function saveContactMessage(
  payload: Omit<ContactMessage, 'id' | 'createdAt'>
): Promise<string> {
  try {
    const newRecord: Omit<ContactMessage, 'id'> = {
      ...payload,
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, CONTACT_COLLECTION), newRecord);
    return docRef.id;
  } catch (error) {
    throw new Error(
      formatFirestoreError(error, 'No fue posible enviar tu mensaje en este momento.')
    );
  }
}

export async function saveQuizAttempt(
  payload: Omit<QuizAttempt, 'id' | 'completedAt'>
): Promise<string> {
  try {
    const attempt: Omit<QuizAttempt, 'id'> = {
      ...payload,
      completedAt: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, QUIZ_COLLECTION), attempt);
    return docRef.id;
  } catch (error) {
    throw new Error(
      formatFirestoreError(error, 'Error al registrar el puntaje del quiz.')
    );
  }
}

export async function fetchTopQuizAttempts(maxCount = 6): Promise<QuizAttempt[]> {
  try {
    const attemptsQuery = query(
      collection(db, QUIZ_COLLECTION),
      orderBy('completedAt', 'desc'),
      limit(maxCount)
    );
    const snapshot = await getDocs(attemptsQuery);
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<QuizAttempt, 'id'>),
    }));
  } catch {
    return [];
  }
}

export async function registerUserProfile(email: string): Promise<string> {
  try {
    const account: Omit<UserAccount, 'id'> = {
      email: email.trim().toLowerCase(),
      createdAt: new Date().toISOString(),
    };
    const docRef = await addDoc(collection(db, USERS_COLLECTION), account);
    return docRef.id;
  } catch (error) {
    throw new Error(
      formatFirestoreError(error, 'Error al registrar el usuario en Firestore.')
    );
  }
}
