import { useState, useContext } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { logoutUser } from "../../firebase/FireBaseAuth";
import AuthContext from "../../contexts/authContext";
import { useHistory } from "react-router";

const NavBar = () => {
  const [currentUser, setCurrentUser] = useContext(AuthContext);

  const history = useHistory();

  const handleLogout = () => {
    logoutUser(setCurrentUser);
    history.push("/");
  };

  const handleRegister = () => {
    history.push("/register");
  };

  const handleLogin = () => {
    history.push("/login");
  };

  return (
    <div className="synduce-navbar">
      <div
        className="synduce-navbar-brand"
        onClick={() => history.push("/")}
        style={{ cursor: "pointer" }}
      >
        <h1>Synduce</h1>
      </div>
      {!currentUser ? (
        <div className="synduce-navbar-opts">
          <p onClick={handleLogin}>Login</p>
          <button className="synduce-button" onClick={handleRegister}>
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
