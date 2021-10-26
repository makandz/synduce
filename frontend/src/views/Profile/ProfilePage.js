import { useState } from "react";
import { useAuth } from "../../libs/hooks/Auth";
import LoginField from "../../components/Login/LoginField";
import DisplayBox from "../../components/general/DisplayBox";

const Profile = () => {
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

  return (
    <div
      className="login-form"
      style={{ position: "relative", overflow: "hidden" }}
    >
      <h1 className="login-header">{"Update the profile"}</h1>

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

        {successMsg && (
          <DisplayBox
            bgColor="#d4edda"
            borderColor="#c3e6cb"
            color="#155724"
            w="100%"
            h="auto"
            text={successMsg}
            style={{ alignSelf: "center", marginBottom: "1em" }}
          />
        )}

        <LoginField
          id="profile-email"
          label="Email"
          value={email}
          setValue={setEmail}
        />

        <LoginField
          id="profile-current-password"
          label="Current Password"
          required
          value={currentPassword}
          setValue={setCurrentPassword}
          type="password"
        />

        <LoginField
          id="profile-password"
          label="Password"
          value={password}
          setValue={setPassword}
          type="password"
        />

        <div style={{ display: "flex" }}>
          <button
            className="synduce-button register-button"
            onClick={handlePasswordUpdate}
            style={{ margin: "1em" }}
          >
            <p>Update Password</p>
          </button>

          <button
            className="synduce-button register-button"
            onClick={handleEmailUpdate}
            style={{ margin: "1em" }}
          >
            <p>Update Email</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
