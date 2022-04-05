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

  return (
    <div>
      <button onClick={handleOnclick}>Login with Google</button>
    </div>
  );
}

export default LoginView;
