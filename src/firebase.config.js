import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCAUXjQrBUbVE3NvPvzBjCoxgziy5u3ve0",
  authDomain: "bensonrent-cc583.firebaseapp.com",
  projectId: "bensonrent-cc583",
  storageBucket: "bensonrent-cc583.appspot.com",
  messagingSenderId: "933617964512",
  appId: "1:933617964512:web:ed6727d5c6eb10ab854785"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);  
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app