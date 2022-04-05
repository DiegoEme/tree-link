# GUIA FIREBASE AND REACT

1. Create project in Firebase
2. npm install firebase in project
3. npm i react-router-dom
4. create 3 folders: components, routes and firebase
5. In index.js import { BrowserRouter, Routes, Route } from "react-router-dom";
6. Wrap app in router like this:

- ```
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
    </Routes>
  </BrowserRouter>
  ```

7. create more routes like the login and add it to the BrowserRoutes
8. create a login.jsx in the routes folder and add a react stateless function

9. FIREBASE CONFIG:

- create a file called firebase.js and paste the firebaseConfig from project console.
- import { getAuth } from "firebase/auth";
- import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
  } from "firebase/storage";
- import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  doc,
  getDoc,
  query,
  where,
  setDoc,
  deleteDoc,
  } from "firebase/firestore";

- Initialize the auth, storage and database (firestore) like this:
  const auth = getAuth(app);
  const db = getFirestore(app);
  const storage = getStorage(app);

- Hide the info from firebaseConfig in a .env always use REACT_APP to start with the name of every variable

- Add the following logic to authenticate user usign google

  ```
  import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  import { auth } from "../firebase/firebase";

  function LoginView() {
    const handleOnclick = async () => {
      const googleProvider = new GoogleAuthProvider();
      await signinWithGoogle(googleProvider);
    };

    const signinWithGoogle = async (googleProvider) => {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };
  ```
