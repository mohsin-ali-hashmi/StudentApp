import { initializeApp } from "firebase/app";

import {getAuth} from 'firebase/auth'


const firebaseConfig = {
 //configuration
};

// Initialize Firebase

const firebase = initializeApp(firebaseConfig);

export const auth = getAuth(firebase);
export default firebase