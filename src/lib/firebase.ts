import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDjR5cNxk9xO78JP3CM8fdjEiDE3bg7TIA",
  authDomain: "pawfinder-2ce54.firebaseapp.com",
  projectId: "pawfinder-2ce54",
  storageBucket: "pawfinder-2ce54.firebasestorage.app",
  messagingSenderId: "378477815727",
  appId: "1:378477815727:web:9a3e5c28094db8d561b15a",
  measurementId: "G-SRY4L6J3NR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore with persistence
initializeFirestore(app, {
  localCache: persistentLocalCache(
    { tabManager: persistentMultipleTabManager() }
  )
});

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);