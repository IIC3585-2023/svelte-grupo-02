import { writable, get } from "svelte/store";
import { browserLocalPersistence, setPersistence, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./integrations/firebase";

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

async function addToFavorites(hero) {
  favorites.update((items) => {
    if (items.some(item => item.id === hero.id)) {
      return items;
    }
    return [...items, hero.id]
  });
  const userValue = get(user);
  const favoritesValue = get(favorites);
  const userRef = doc(db, 'users', userValue.uid);
  try {
    await setDoc(userRef, {favorites: favoritesValue}, {merge: true});
  } catch (error) {
    console.log(error);
  }
}

async function removeFromFavorites(hero) {
  favorites.update((items) => items.filter(item => item !== hero.id));
  const userValue = get(user);
  const favoritesValue = get(favorites);
  const userRef = doc(db, 'users', userValue.uid);
  try {
    await setDoc(userRef, {favorites: favoritesValue}, {merge: true});
  } catch (error) {
    console.log(error);
  }
}

export { user, loading, favorites, signIn, logOut, addToFavorites, removeFromFavorites };

