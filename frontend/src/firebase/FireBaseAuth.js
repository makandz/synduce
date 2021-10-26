import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import firebaseApp from "./FireBaseConfig";

const auth = getAuth(firebaseApp);

const registerUser = (email, password, setError, setCurrentUser) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setCurrentUser(userCredential.user);
    })
    .catch((error) => {
      setError(
        "Email already exists, please use registered email. If not, try with a different email."
      );
    });
};

const loginUser = (email, password, setError, setCurrentUser) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setCurrentUser(userCredential.user);
    })
    .catch((error) => {
      setError(
        "Invalid credentials, please check login information and try again."
      );
    });
};

const logoutUser = (setCurrentUser) => {
  signOut(auth)
    .then(() => {
      setCurrentUser(null);
    })
    .catch((error) => {
      
    });
};

export { auth, registerUser, loginUser, logoutUser };
