import { useState } from "react";
import { useAuth } from "../hooks/Auth";
import LoginField from "../components/Login/LoginField";
import DisplayBox from "../components/general/DisplayBox";

const Profile = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const auth = useAuth();

  const handleEmailUpdate = () => {
    if (email){
      auth.updateEmail(password, setError);
      if (!error) {
        setSuccessMsg("Email has been successfully updated!");
        console.log("Successfully updated email");
      }
    }
    else {
      setError("Email cannot be empty!");
    }
  };

  const handlePasswordUpdate = () => {
    if (password){
      auth.updatePassword(email, setError);
      if (!error) {
        setSuccessMsg("Password has been successfully updated!");
        console.log("Successfully updated password");
      }
    }
    else {
      setError("Password cannot be empty!");
    }
  };

  return (
    <div className="login-form" style={{position: "relative", overflow: "hidden" }}>
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
          required
          value={email}
          setValue={setEmail}
        />

        <LoginField
          id="profile-password"
          label="Password"
          required
          value={password}
          setValue={setPassword}
          type="password"
        />

        <div style={{ display: "flex"}}>
          <button
            className="synduce-button register-button"
            onClick={handlePasswordUpdate}
            style={{margin: "1em"}}
          >
            <p>Update Password</p>
          </button>

          <button
            className="synduce-button register-button"
            onClick={handleEmailUpdate}
            style={{margin: "1em"}}
          >
            <p>Update Email</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
