import  firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore'

var FireBaseConfig = {
  apiKey: "AIzaSyAt8UaIXSABokI1y_sAi9uZ367sHaCDzfU",
  authDomain: "messenger-da733.firebaseapp.com",
  projectId: "messenger-da733",
  storageBucket: "messenger-da733.appspot.com",
  messagingSenderId: "706645202038",
  appId: "1:706645202038:web:6e2dc7a42744e481787b57",
  measurementId: "G-WNP44NFC69"
};
let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(FireBaseConfig);

} else {
  app = firebase.app()
}
const db =app.firestore();
const auth = firebase.auth();
export { auth, db };
