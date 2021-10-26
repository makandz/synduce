import AuthContext from "../contexts/authContext";
import { useContext, useState } from "react";
import LoginField from "../components/Login/LoginField";
import DisplayBox from "../components/general/DisplayBox";
import { updateTheEmail, updateThePassword } from "../firebase/FireBaseAuth";

const Profile = () => {
  const [currentUser, setCurrentUser] = useContext(AuthContext);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleEmailUpdate = () => {
    updateThePassword(password, setError);
    if (!error){
      console.log("Successfully updated email");
    }
  }

  const handlePasswordUpdate = () => {
    updateTheEmail(password, setError);
    if (!error){
      console.log("Successfully updated email");
    }
  }

  return (
    <div className="login-form">

      <h1 className="login-header">
        {"Update the profile"}
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
          
          <LoginField
            id="profile-email"
            label="Email"
            required
            value={email}
            setValue={setEmail}
          />

          <button
            className="synduce-button register-button"
            onClick={handleEmailUpdate}
          >
            <p>Update Email</p>
          </button>

          <LoginField
            id="profile-password"
            label="Password"
            required
            value={password}
            setValue={setPassword}
            type="password"
          />

          <button
            className="synduce-button register-button"
            onClick={handlePasswordUpdate}
          >
            <p>Update Password</p>
          </button>

      </div>
    </div>
  )
};


export default Profile