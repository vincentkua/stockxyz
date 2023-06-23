importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/9.1.3/firebase-messaging-compat.js");
firebase.initializeApp({
    apiKey: "AIzaSyA1tY30-3d07INCEKJTsDuPOgegg7rOKLQ",
    authDomain: "stock-xyz.firebaseapp.com",
    projectId: "stock-xyz",
    storageBucket: "stock-xyz.appspot.com",
    messagingSenderId: "1082776258906",
    appId: "1:1082776258906:web:b890b7428e8b971ced8b63"
});
const messaging = firebase.messaging();
