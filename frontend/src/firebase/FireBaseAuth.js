import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail, 
  updatePassword
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

const updateTheEmail = (newEmail, setError) => {
  updateEmail(auth.currentUser, newEmail).then(() => {
    console.log("Updated username!")
  }).catch((error) => {
    setError(
      "Error"
    )
    console.log("Something went wrong!")
  })
};

const updateThePassword = (newPassword, setError) => {
  updatePassword(auth.currentUser, newPassword).then(() => {
    console.log("Updated password!")  
  }).catch((error) => {
    setError(
      "Error"
    )
    console.log("Somethign went wrong!")
  })
};

export { auth, registerUser, loginUser, logoutUser, 
          updateTheEmail, updateThePassword };
