import { useState, useContext } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { logoutUser } from "../../firebase/FireBaseAuth";
import AuthContext from "../../contexts/authContext";

const NavBar = () => {
  const [currentUser, setCurrentUser] = useContext(AuthContext);

  const handleLogout = () => {
    logoutUser(setCurrentUser);
  }

  return (
    <div className="synduce-navbar">
      <div className="synduce-navbar-brand">
        <h1>Synduce</h1>
      </div>
      {!currentUser ? (
        <div className="synduce-navbar-opts">
          <p>Login</p>
          <button className="synduce-button">
            <p>Register for free</p>
            <AiOutlineArrowRight />
          </button>
        </div>
      ) : (
        <div className="synduce-navbar-opts">
          <p>{currentUser.email}</p>
          <button className="synduce-button" onClick={handleLogout}>
            <p>Logout</p>
            <AiOutlineArrowRight />
          </button>
        </div>
      )}
    </div>
  );
};

export default NavBar;
