import firebase from "firebase/app";
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
    apiKey: "AIzaSyD4X_fhA7wqugly-NtDLK_qbRbIxO-9Czk",
    authDomain: "nlw-together-f43ca.firebaseapp.com",
    databaseURL: "https://nlw-together-f43ca-default-rtdb.firebaseio.com",
    projectId: "nlw-together-f43ca",
    storageBucket: "nlw-together-f43ca.appspot.com",
    messagingSenderId: "979831924811",
    appId: "1:979831924811:web:c7283326004c705e4a05ce"
};


firebase.initializeApp(firebaseConfig);

const auth = firebase.auth()
const database = firebase.database()

export { firebase, auth, database }