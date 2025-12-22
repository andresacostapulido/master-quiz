// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAdv8kYX6ojZp-SOctuiv4X-yZAsinRPl0",
    authDomain: "autenticacion-98dbb.firebaseapp.com",
    databaseURL: "https://autenticacion-98dbb-default-rtdb.firebaseio.com",
    projectId: "autenticacion-98dbb",
    storageBucket: "autenticacion-98dbb.firebasestorage.app",
    messagingSenderId: "1039720949330",
    appId: "1:1039720949330:web:e0e0e0e0e0e0e0e0e0e0e0"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();
const PROJECT_NAME = 'master-quiz';
