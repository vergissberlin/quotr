import firebase from 'firebase'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAkj3GHUolffkKaS_CZ1OsEKZBVPJyhyMU",
  authDomain: "moomoo-aa87b.firebaseapp.com",
  databaseURL: "https://moomoo-aa87b.firebaseio.com",
  projectId: "moomoo-aa87b",
  storageBucket: "moomoo-aa87b.appspot.com",
  messagingSenderId: "176872801971",
  appId: "1:176872801971:web:ec74f29ac290415a7b12c6"
};

class Firebase {
	static db;

	// Init the class
	static init() {
		if (firebase.apps.length === 0) {
			firebase.initializeApp(firebaseConfig)
		}
		Firebase.db = firebase.firestore();
	}
}

export default Firebase;
