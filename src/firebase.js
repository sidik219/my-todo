// Import the functions you need from the SDKs you need
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBGXsxaHgmf2vspdPqRHYzh7HgavY2bMqY",
    authDomain: "my-todo-5d03a.firebaseapp.com",
    projectId: "my-todo-5d03a",
    storageBucket: "my-todo-5d03a.appspot.com",
    messagingSenderId: "148172421534",
    appId: "1:148172421534:web:ea5895f2d26bb739a5fe8f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// DB Firebase
export const db = getFirestore(app)
