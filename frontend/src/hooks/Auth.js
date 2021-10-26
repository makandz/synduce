import AuthContext from "../contexts/authContext";
import {
  auth,
  loginUser,
  logoutUser,
  registerUser,
  updateTheEmail,
  updateThePassword,
} from "../firebase/FireBaseAuth";
import { useState, useContext } from "react";

function useAuth() {
  return useContext(AuthContext);
}

function useProvideAuth() {
  const [user, setUser] = useState(auth.currentUser);

  const signin = (email, password, setError, cb) => {
    loginUser(email, password, setError, setUser);
    if (user) cb();
  };

  const signout = (cb) => {
    logoutUser(setUser);
    cb();
  };

  const register = (email, password, setError, cb) => {
    registerUser(email, password, setError, setUser);
    if (user) cb();
  };

  const updateEmail = (newEmail, setError) => {
    updateTheEmail(newEmail, setError);
  }

  const updatePassword = (newPassword, setError) => {
    updateThePassword(newPassword, setError);
  }

  return {
    user,
    signin,
    signout,
    register,
    updateEmail,
    updatePassword,
  };
}

export {useAuth, useProvideAuth};
