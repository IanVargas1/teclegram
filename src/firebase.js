import firebase from "firebase"
import {v4} from 'uuid'
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

export const storage = firebase.storage();

export const deleteMessage = id => console.log('id: ',id);

/**
 * Upload a file to firebase storage
 * @param {File} file the file to upload
 * @returns {Promise<string>} url of the uploaded file
 */

export async function uploadFile(file){
  const storageRef = storage.ref()
  var idImg=v4()
  const mountainsRef = storageRef.child('imagen/'+idImg);
  await mountainsRef.put(file)
  const url = await mountainsRef.getDownloadURL()
  return url
}