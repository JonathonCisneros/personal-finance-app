// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDge64Hp8ziXq73CCXsSvQvEyTFjYxZNAg',
  authDomain: 'personal-finance-app-7bdc7.firebaseapp.com',
  projectId: 'personal-finance-app-7bdc7',
  storageBucket: 'personal-finance-app-7bdc7.appspot.com',
  messagingSenderId: '306201243160',
  appId: '1:306201243160:web:161422602644041bc5dd6d',
  measurementId: 'G-BC6KNQ5FXH',
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
