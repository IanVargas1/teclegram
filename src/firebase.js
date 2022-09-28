import firebase from "firebase"

const firebaseConfig = {
  apiKey: "AIzaSyALlrmHRONjmwMkN-6NvD7AH2rj6fz1luU",
  authDomain: "teclegram-40174.firebaseapp.com",
  projectId: "teclegram-40174",
  storageBucket: "teclegram-40174.appspot.com",
  messagingSenderId: "656133036905",
  appId: "1:656133036905:web:592dcbc40f396942d23bf8",
  measurementId: "G-9JMBG2C6RN",
};

const app = firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const db = app.firestore();

const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };

export default db;

export const deleteMessage = id => console.log('id: ',id);
