import firebase from 'firebase';
import 'firebase/auth';

import { firebaseConfig } from 'auth/config';

!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { auth, firebase, facebookProvider, googleProvider };
