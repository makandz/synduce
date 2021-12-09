import { useState } from "react";
import { useAuth } from "../../libs/hooks/Auth";
import TextInput from "../../components/Forms/TextInput/TextInput";
import DisplayBox from "../../components/Forms/DisplayBox/DisplayBox";
import baseStyles from '../../components/Styling.module.css';
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const [password, setPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const auth = useAuth();

  const handleEmailUpdate = () => {
    if (email && currentPassword) {
      auth.updateEmail(currentPassword, email, setError, setSuccessMsg);
    } else {
      setError("Email cannot be empty!");
    }
  };

  const handlePasswordUpdate = () => {
    if (password && currentPassword) {
      auth.updatePassword(currentPassword, password, setError, setSuccessMsg);
    } else {
      setError("Password cannot be empty!");
    }
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    if (password) {
      handlePasswordUpdate();
    } else if (email) {
      handleEmailUpdate();
    }
  }

  return (
    <>
      <h1 className={baseStyles.header}>
        Update your profile
      </h1>

      <div className={styles.form}>
        <form onSubmit={handleProfileUpdate}>
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

          {successMsg && (
            <DisplayBox
              bgColor="#d4edda"
              borderColor="#c3e6cb"
              color="#155724"
              w="100%"
              h="auto"
              text={successMsg}
              style={{ alignSelf: "center", marginBottom: "20px" }}
            />
          )}

          <TextInput
            id="profile-email"
            label="Email"
            value={email}
            setValue={setEmail}
          />

          <TextInput
            id="profile-current-password"
            label="Current Password"
            required
            value={currentPassword}
            setValue={setCurrentPassword}
            type="password"
          />

          <TextInput
            id="profile-password"
            label="Password"
            value={password}
            setValue={setPassword}
            type="password"
          />

          <button
            className={baseStyles.btn}
            type="submit"
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfilePage;
