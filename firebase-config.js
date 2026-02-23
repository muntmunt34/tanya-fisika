// =====================================================
// FIREBASE CONFIG — Tanya Fisika
// =====================================================
// Load Firebase SDK via CDN (no npm needed)
// This file must be loaded AFTER Firebase SDK scripts and BEFORE firebase-db.js

const firebaseConfig = {
    apiKey: "AIzaSyAHKtiQex3aXXSFjND1c4pg2QbWwXhmJPo",
    authDomain: "tanya-fisika.firebaseapp.com",
    projectId: "tanya-fisika",
    storageBucket: "tanya-fisika.firebasestorage.app",
    messagingSenderId: "102533512173",
    appId: "1:102533512173:web:a4900f131da5accfb045e4",
    measurementId: "G-7ZG2TBMPQV"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize services
const db = firebase.firestore();
const auth = firebase.auth();

// Set persistence so auth state survives browser close
auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL);

console.log('[Firebase] Initialized successfully — project: tanya-fisika');
