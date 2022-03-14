//llamamos a la libreria
import firebase from "firebase/app";

//llamamos al servicio de fireStore
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD9gHB--p-ZrMLoTO0IP2Y8RixacJ0jTD8",
    authDomain: "crud-udemy-playlist.firebaseapp.com",
    projectId: "crud-udemy-playlist",
    storageBucket: "crud-udemy-playlist.appspot.com",
    messagingSenderId: "661353227559",
    appId: "1:661353227559:web:dc059da3aa90efa9b17502"
  };
  
  // Initialize Firebase
   firebase.initializeApp(firebaseConfig);

   //exportamos el firebase
   export {firebase}