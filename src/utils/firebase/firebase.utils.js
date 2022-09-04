import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, Firestore } from 'firebase/firestore';

// this page is all about what google wants for authentication

// all these functions go in here so that there's a page to connect the backend to the firebase app
// (any underlying service)
// then if the service changes stuff we'll know where to go, not everything has to be refactored

// tells fb which app we want that we made within the fb site
const firebaseConfig = {
    // not a super secret api key (like others)
    apiKey: "AIzaSyCF81R-bo6NWp13vZOVLhswhe3A1gE85n0",
    authDomain: "capstone-db-1f257.firebaseapp.com",
    projectId: "capstone-db-1f257",
    storageBucket: "capstone-db-1f257.appspot.com",
    messagingSenderId: "551316371409",
    appId: "1:551316371409:web:df2f5ec5c7f7c6479a92f0"
};
  
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// GAP is a class
// can have many dif provider types but there's only one kind of auth (per app like fb)
const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();

// labelling the provider (G) in the name bc could be any (always just giv prov/ auth)
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {

    if (!userAuth) return;

    // takes 3 args: db, collection, identifier 
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    console.log(userSnapshot);

    // if user does not exist
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, { displayName, email, createdAt, ...additionalInfo });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }
    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async(email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}

