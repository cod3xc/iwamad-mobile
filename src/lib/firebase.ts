import { initializeApp } from 'firebase/app';
import { initializeAuth } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { persistence } from './authPersistence';

const firebaseConfig = {
  apiKey: 'AIzaSyB-CgZUFKwUPIafAifZnAmB1EJCtYZ-PWE',
  authDomain: 'iwamad-chat-587c8.firebaseapp.com',
  databaseURL: 'https://iwamad-chat-587c8-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'iwamad-chat-587c8',
  storageBucket: 'iwamad-chat-587c8.firebasestorage.app',
  messagingSenderId: '28132141242',
  appId: '1:28132141242:web:e46e56b9efc74f0911ba83',
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = initializeAuth(app, { persistence });
