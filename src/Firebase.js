import firebase from "firebase/app"
import "firebase/firestore"
const firebaseConfig = {
    apiKey: "AIzaSyBko5TEHTOMjpiJU1xMzp1oDk9b2WLJPeQ",
    authDomain: "todo-project-405ac.firebaseapp.com",
    databaseURL: "https://todo-project-405ac-default-rtdb.firebaseio.com/",
    projectId: "todo-project-405ac",
    storageBucket: "todo-project-405ac.appspot.com",
    messagingSenderId: "376129887347",
    appId: "1:376129887347:web:d6fccdda9995369268de06"
  };

firebase.initializeApp(firebaseConfig)

export default firebase