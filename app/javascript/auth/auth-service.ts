import firebase from 'firebase';
import 'firebase/auth';

import { firebaseConfig } from 'auth/config';

// eslint-disable-next-line no-unused-expressions
!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();

export { auth, firebase, facebookProvider, googleProvider };
