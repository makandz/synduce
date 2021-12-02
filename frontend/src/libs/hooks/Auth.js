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

  const signin = async (email, password, setError, cb) => {
    try{
      const userCredential = await loginUser(email, password, setError, setUser);
      setUser({...userCredential.user});
      cb();
    } catch (error){
      setError(error.message);
    }
  };

  const signout = async (cb) => {
    try{
      logoutUser(setUser);
      setUser(null);
      cb();
    } catch (error){
      console.error("Signout Error");
    }
  };

  const register = async (email, password, setError, cb) => {
    try {
      const userCredential = await registerUser(email, password, setError, setUser);
      setUser({...userCredential.user});
      cb();
    } catch(error) {
      setError(error.message);
    }
  };

  const updateEmail = (currentPassword, newEmail, setError, setSuccess) => {
    updateTheEmail(currentPassword, newEmail, setError, setUser, setSuccess);
  }

  const updatePassword = (currentPassword, newPassword, setError, setSuccess) => {
    updateThePassword(currentPassword, newPassword, setError, setUser, setSuccess);
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
