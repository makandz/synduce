import { AiOutlineArrowRight } from "react-icons/ai";

const NavBar = () => {
  return (
    <div className="synduce-navbar">
      <div className="synduce-navbar-brand">
        <h1>Synduce</h1>
      </div>
      <div className="synduce-navbar-opts">
        <p>Login</p>
        <button className="synduce-button">
          <p>Register for free</p>
          <AiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

export default NavBar;
