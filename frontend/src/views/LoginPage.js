import { useState } from "react";
import LoginField from "../components/Login/LoginField";
import DisplayBox from "../components/general/DisplayBox";

const LoginPage = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");

  const registerUser = () => {
    if (password !== confirmedPassword) {
      setError("Passwords do match, please review them.");
    } else if (password.length === 0) {
      setError("Cannot leave password as blank.");
    }
  };

  const loginUser = () => {
      
  }

  return (
    <div className="login-form">
      <h1 className="login-header">
        {props.isRegister ? "Register for an account" : "Log In"}
      </h1>

      {error && (
        <DisplayBox
          bgColor="#d1797b"
          borderColor="#911416"
          w="40%"
          h="auto"
          text={error}
          style={{ alignSelf: "center", marginBottom: "1em" }}
        />
      )}

      {props.isRegister && (
        <LoginField
          id="login-name"
          label="Name"
          required
          value={name}
          setValue={setName}
        />
      )}

      <LoginField
        id="login-email"
        label="Email"
        required
        value={email}
        setValue={setEmail}
      />

      <LoginField
        id="login-password"
        label="Password"
        required
        value={password}
        setValue={setPassword}
      />

      {props.isRegister && (
        <LoginField
          id="login-conf-password"
          label="Confirm Password"
          required
          value={confirmedPassword}
          setValue={setConfirmedPassword}
        />
      )}

      {props.isRegister && (
        <button
          className="synduce-button register-button"
          onClick={registerUser}
        >
          <p>Register</p>
        </button>
      )}

      {!props.isRegister && (
        <button className="synduce-button register-button" onClick={loginUser}>
          <p>login</p>
        </button>
      )}
    </div>
  );
};

export default LoginPage;
