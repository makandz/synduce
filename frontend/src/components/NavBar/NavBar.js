import { AiOutlineArrowRight } from "react-icons/ai";
import { useAuth } from "../../hooks/Auth";
import { useHistory } from "react-router";

const NavBar = () => {
  
  const auth = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    auth.signout(() => history.push("/"));
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
        style={{ cursor: "pointer" }}
        onClick={() => history.push("/")}
      >
        <h1>Synduce</h1>
      </div>
      {!auth.user ? (
        <div className="synduce-navbar-opts">
          <p onClick={handleLogin}>Login</p>
          <button className="synduce-button" onClick={handleRegister}>
            <p>Register for free</p>
            <AiOutlineArrowRight />
          </button>
        </div>
      ) : (
        <div className="synduce-navbar-opts">
          <p onClick={() => history.push("/profile")}>{auth.user.email}</p>
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
