import * as firebase from 'firebase'

export const config = {
  apiKey: "AIzaSyAADbJjtfRn6-Bat2z8cuv2j9vCyDExb00",
  authDomain: "reactibook-4bdc8.firebaseapp.com",
  databaseURL: "https://reactibook-4bdc8.firebaseio.com",
  projectId: "reactibook-4bdc8",
  storageBucket: "reactibook-4bdc8.appspot.com",
  messagingSenderId: "1083651588664"
};

firebase.initializeApp(config);

export const db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

export default firebase;