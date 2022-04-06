import { useNavigate } from "react-router-dom";
import { useState } from "react";

import AuthProvider from "../components/authProvider";
import { existsUsername } from "../firebase/firebase";

function ChooseUsernameView() {
  const [state, setState] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [username, setUsername] = useState("");

  /* 
  State
  0: inicializado
  1: loading
  2: login completo
  3: login pero sin registro
  4: no hay nadie logueado
  5: Ya existe username
  */

  const navigate = useNavigate();

  const handleUserLoggedIn = () => {
    navigate("/dashboard");
  };

  const handleUserNotLoggedIn = () => {
    navigate("login");
  };

  const handleUserNotRegistered = (user) => {
    setCurrentUser(user);
    setState(3);
  };

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleContinue = async () => {
    if (username !== "") {
      const exists = await existsUsername(username);

      if (exists) {
        setState(5);
      } else {
        const temp = { ...currentUser };
        temp.processCompleted = true;
      }
    }
  };

  if (state === 3) {
    return (
      <div>
        <h1>Bienvenido {currentUser.displayName}</h1>
        <p>Para terminar el proceso elige un nombre de usuario</p>
        <div>
          <input type="text" onChange={handleInputUsername} />
        </div>
        <div>
          <button onClick={handleContinue}>Continuar</button>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider
      onUserLoggedIn={handleUserLoggedIn}
      onUserNotLoggedIn={handleUserNotLoggedIn}
      onUserNotRegistered={handleUserNotRegistered}
    ></AuthProvider>
  );
}

export default ChooseUsernameView;
