import firebase from 'firebase/app';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
    apiKey: "AIzaSyCR2WGPzKfVJsrCNLzOdwYFPUyB-eVLNYQ",
    authDomain: "app-chat-66ff1.firebaseapp.com",
    projectId: "app-chat-66ff1",
    storageBucket: "app-chat-66ff1.appspot.com",
    messagingSenderId: "724611761415",
    appId: "1:724611761415:web:ec0452e2aebbccb98d71a2",
    measurementId: "G-20PED2KEEE"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const auth = firebase.auth();
const db = firebase.firestore();

// if (window.location.hostname === 'localhost') {
//     auth.useEmulator('http://localhost:9099');
//     db.useEmulator('localhost', '8080')
// }

export {auth, db};
export default firebase;