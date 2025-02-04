import { initializeApp, getApps, getApp } from "firebase/app";
import {  createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile,} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY?.trim(),
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
const firebase_app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const auth = getAuth(firebase_app);
export const db = getFirestore(firebase_app);

export const register = (email:string, username:string, password:string) => {
  return createUserWithEmailAndPassword(auth, email,password).then((response) => updateProfile(response.user, {displayName: username}))
}

export const login = (email:string, password:string) => {
  return signInWithEmailAndPassword(auth,email,password)
};

export default firebase_app;