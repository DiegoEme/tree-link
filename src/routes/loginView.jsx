import { useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";

function LoginView() {
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setState] = useState(0);

  /* 
  State
  0: inicializado
  1: loading
  2: login completo
  3: login pero sin registro
  4: no hay nadie logueado
  */

  useEffect(() => {
    setState(1);
    onAuthStateChanged(auth, handleUserStateChanged);
  }, []);

  const handleUserStateChanged = async (user) => {
    if (user) {
      //if user exits it means it is already in db
      const isRegistered = await userExists(user.uid);
      if (isRegistered) {
        //TODO: redirect user to dashboard
        setState(2);
      } else {
        //TODO: redirect to choose user name
        setState(3);
      }
      setCurrentUser(true);
    } else {
      setState(4);
      setCurrentUser(null);
      console.log("no hay nadie autenticado");
    }
  };

  const handleOnclick = async () => {
    const googleProvider = new GoogleAuthProvider();

    const signinWithGoogle = async (googleProvider) => {
      try {
        const res = await signInWithPopup(auth, googleProvider);
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };

    await signinWithGoogle(googleProvider);
  };

  if (state === 2) {
    return <div>Estas autenticado y registrado</div>;
  }

  if (state === 3) {
    return <div>Estas autenticado pero no registrado</div>;
  }

  if (state === 4) {
    return (
      <div>
        {currentUser && (
          <button onClick={handleOnclick}>Login with Google</button>
        )}
      </div>
    );
  }

  return <div>Loading...</div>;
}

export default LoginView;
