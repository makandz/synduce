import { useState } from "react";
import TextInput from "../../components/Forms/TextInput/TextInput";
import DisplayBox from "../../components/Forms/DisplayBox/DisplayBox";
import { useAuth } from "../../libs/hooks/Auth";
import styles from './RegisterPage.module.css';
import baseStyles from '../../components/Styling.module.css';

export default function RegisterPage(props) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useAuth();

  const handleRegistration = (e) => {
    e.preventDefault();
    if (password !== confirmedPassword) {
      setError("Passwords do match, please review them.");
    } else if (!password.length || !email.length || !name.length) {
      setError("Cannot leave required fields blank.");
    } else {
      auth.register(email, password, setError, () => {});
    }
  };

  return (
    <>
      <h1 className={baseStyles.header}>
        Register for an account
      </h1>

      <div className={styles.form}>
        <form onSubmit={handleRegistration}>
          {error && (
            <DisplayBox
              bgColor="#f8d7da"
              borderColor="#f8d7da"
              color="#721c24"
              w="100%"
              h="auto"
              text={error}
              style={{ alignSelf: "center", marginBottom: "20px" }}
            />
          )}

          <TextInput
            id="login-name"
            label="Name"
            required
            value={name}
            setValue={setName}
          />

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

          <TextInput
            id="login-conf-password"
            label="Confirm Password"
            required
            value={confirmedPassword}
            setValue={setConfirmedPassword}
            type="password"
          />

          <button
            className={baseStyles.btn}
            type="submit"
          >
            Register
          </button>
        </form>
      </div>
    </>
  );
};
