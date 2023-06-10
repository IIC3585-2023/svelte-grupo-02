import { writable } from "svelte/store";
import { browserLocalPersistence, setPersistence, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { auth } from "./integrations/firebase";

const user = writable(null);
const loading = writable(false);
const favorites = writable([]);

async function signIn() {
  await setPersistence(auth, browserLocalPersistence);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: 'select_account'
  });
  try {
    const res = await signInWithPopup(auth, provider);
    user.set(res.user);
  } catch (error) {
    console.log(error);
  }
}

async function logOut() {
  try {
    await signOut(auth);
    user.set(null);
  } catch (error) {
    console.log(error);
  }
}

export { user, loading, favorites, signIn, logOut };

