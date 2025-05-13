// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging';

// Firebase 콘솔에서 복사한 config
const firebaseConfig = {
  apiKey: 'AIzaSyBY_KbODG9HQzyltb_oSt-Oh1bD77Z3qlk',
  authDomain: 'pocketing-7a2dd.firebaseapp.com',
  projectId: 'pocketing-7a2dd',
  storageBucket: 'pocketing-7a2dd.appspot.com',
  messagingSenderId: '869118637468',
  appId: '1:869118637468:web:591f35eff6ce9fce210459',
  measurementId: 'G-ZBLL446HH9',
};

const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);


