import { useState } from "react";
import TextInput from "../../components/Forms/TextInput/TextInput";
import DisplayBox from "../../components/Forms/DisplayBox/DisplayBox";
import { useAuth } from "../../libs/hooks/Auth";
import styles from './LoginPage.module.css';
import baseStyles from '../../components/Styling.module.css';

export default function LoginPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useAuth();

  const handleRegistration = () => {
    if (password !== confirmedPassword) {
      setError("Passwords do match, please review them.");
    } else if (!password.length || !email.length || !name.length) {
      setError("Cannot leave required fields blank.");
    } else {
      auth.register(email, password, setError, () => {});
    }
  };

  const handleLogin = () => {
    auth.signin(email, password, setError, () => {})
    if (!error) {
      // Redirect the page
      console.log("login has succeeded");
    }
  };

  return (
    <div className={styles.form}>
      <h1 className="login-header">
        {props.isRegister ? "Register for an account" : "Log In"}
      </h1>

      <div style={{ alignSelf: "center", display: "flex", flexFlow: "column" }}>
        {error && (
          <DisplayBox
            bgColor="#f8d7da"
            borderColor="#f8d7da"
            color="#721c24"
            w="100%"
            h="auto"
            text={error}
            style={{ alignSelf: "center", marginBottom: "1em" }}
          />
        )}

        {props.isRegister && (
          <TextInput
            id="login-name"
            label="Name"
            required
            value={name}
            setValue={setName}
          />
        )}

        <TextInput
          id="login-email"
          label="Email"
          required
          value={email}
          setValue={setEmail}
        />

        <TextInput
          id="login-password"
          label="Password"
          required
          value={password}
          setValue={setPassword}
          type="password"
        />

        {props.isRegister && (
          <TextInput
            id="login-conf-password"
            label="Confirm Password"
            required
            value={confirmedPassword}
            setValue={setConfirmedPassword}
            type="password"
          />
        )}

        {props.isRegister && (
          <button
            className="synduce-button register-button"
            onClick={handleRegistration}
          >
            <p>Register</p>
          </button>
        )}

        {!props.isRegister && (
          <button
            className="synduce-button register-button"
            onClick={handleLogin}
          >
            <p>login</p>
          </button>
        )}
      </div>
    </div>
  );
};
