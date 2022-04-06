import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, userExists } from "../firebase/firebase";
import AuthProvider from "../components/authProvider";

function LoginView() {
  //const [currentUser, setCurrentUser] = useState(null);
  const [state, setState] = useState(0);
  const navigate = useNavigate();

  /* 
  State
  0: inicializado
  1: loading
  2: login completo
  3: login pero sin registro
  4: no hay nadie logueado
  */

  /*   useEffect(() => {
    setState(1);
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        //if user exits it means it is already in db
        const isRegistered = await userExists(user.uid);
        if (isRegistered) {
          //TODO: redirect user to dashboard
          navigate("/dashboard");
          setState(2);
        } else {
          //TODO: redirect to choose user name
          navigate("/choose-username");
          setState(3);
        }
        setCurrentUser(true);
      } else {
        setState(4);
        setCurrentUser(null);
        console.log("no hay nadie autenticado");
      }
    });
  }, [navigate]); */

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

  const handleUserLoggedIn = () => {
    navigate("/dashboard");
  };

  const handleUserNotLoggedIn = () => {
    setState(4);
  };

  const handleUserNotRegistered = () => {
    navigate("/choose-username");
  };

  if (state === 2) {
    return <div>Estas autenticado y registrado</div>;
  }

  if (state === 3) {
    return <div>Estas autenticado pero no registrado</div>;
  }

  if (state === 4) {
    return (
      <div>{<button onClick={handleOnclick}>Login with Google</button>}</div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    >
      <div>Loading...</div>
    </AuthProvider>
  );
}

export default LoginView;
