import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateEmail,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import firebaseApp from "./FireBaseConfig";

const auth = getAuth(firebaseApp);

const registerUser = (email, password, setError, setCurrentUser) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setCurrentUser({...userCredential.user});
    })
    .catch((error) => {
      setError(
        error.message
      );
    });
};

const loginUser = (email, password, setError, setCurrentUser) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      setCurrentUser({...userCredential.user});
    })
    .catch((error) => {
      setError(
        error.message
      );
    });
};

const logoutUser = (setCurrentUser) => {
  signOut(auth)
    .then(() => {
      setCurrentUser(null);
    })
    .catch((error) => {});
};

const updateTheEmail = (currentPassword, newEmail, setError, setUser, setSuccess) => {
  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    currentPassword
  );
  reauthenticateWithCredential(auth.currentUser, credential)
    .then((userCredential) => {
      updateEmail(userCredential.user, newEmail)
        .then(() => {
          setUser({...userCredential.user});
          setSuccess("Email updated succesfully!");
        })
        .catch((error) => {
          setError("Email already in-use.");
        });
    })
    .catch((error) => {
      setError("Could not reauthenticate!");
    });
};

const updateThePassword = (currentPassword, newPassword, setError, setUser, setSuccess) => {
  const credential = EmailAuthProvider.credential(
    auth.currentUser.email,
    currentPassword
  );
  reauthenticateWithCredential(auth.currentUser, credential)
  .then((userCredential) => {
    updatePassword(userCredential.user, newPassword)
    .then(() => {
      setUser({...userCredential.user});
      setSuccess("Password updated succesfully!");
    })
    .catch((error) => {
      setError("Could not update password, please try again later.");
    });
  })
  .catch((error) => {
    setError("Could not reauthenticate!");
  })
};

export {
  auth,
  registerUser,
  loginUser,
  logoutUser,
  updateTheEmail,
  updateThePassword,
};
