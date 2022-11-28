import React from 'react';
import ReactDOM from 'react-dom/client';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth';
import './styles/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/styles.scss';
import RouteSwitch from './RouteSwitch';

const FIREBASE_KEY = process.env.REACT_APP_FIREBASE_WEB_APIKEY;
const firebaseConfig = {
  apiKey: FIREBASE_KEY,
  authDomain: "pokedex-b662f.firebaseapp.com",
  projectId: "pokedex-b662f",
  storageBucket: "pokedex-b662f.appspot.com",
  messagingSenderId: "614012822201",
  appId: "1:614012822201:web:59214de62359547235b168",
  measurementId: "G-J0K9BWZJ44"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
    <RouteSwitch />
  // </React.StrictMode>
);
