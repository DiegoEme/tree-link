import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";

function AuthProvider({
  children,
  onUserLoggedIn,
  onUserNotLoggedIn,
  onUserNotRegistered,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //if user exits it means it is already in db
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          onUserLoggedIn(user);
        } else {
          onUserNotRegistered(user);
        }
      } else {
        onUserNotLoggedIn();
      }
    });
  }, [navigate, onUserLoggedIn, onUserNotRegistered, onUserNotLoggedIn]);

  return <div>{children}</div>;
}

export default AuthProvider;
