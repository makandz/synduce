import { useState } from "react";
import TextInput from "../../components/Forms/TextInput/TextInput";
import DisplayBox from "../../components/Forms/DisplayBox/DisplayBox";
import { useAuth } from "../../libs/hooks/Auth";
import styles from './LoginPage.module.css';
import baseStyles from '../../components/Styling.module.css';

export default function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    auth.signin(email, password, setError, () => {})
    if (!error) {
      // Redirect the page
      console.log("login has succeeded");
    }
  };

  return (
    <>
      <h1 className={baseStyles.header}>
        Account Login
      </h1>

      <div className={styles.form}>
        <form onSubmit={handleLogin}>
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

          <button
            className={baseStyles.btn}
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </>
  );
};
