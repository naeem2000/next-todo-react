import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyDKaE4U1Izf_65c4gMXAe97M2HK7c3izjg',
	authDomain: 'next-todo-9ac1e.firebaseapp.com',
	projectId: 'next-todo-9ac1e',
	storageBucket: 'next-todo-9ac1e.appspot.com',
	messagingSenderId: '727095586993',
	appId: '1:727095586993:web:2735eea4a1892e1169f290',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const user = auth.currentUser;
