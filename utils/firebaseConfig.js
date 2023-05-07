import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  storageBucket: 'gs://kollab-b4420.appspot.com/',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
