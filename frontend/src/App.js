import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import { useState } from "react";
import { auth } from "./firebase/FireBaseAuth";
import AuthContext from "./contexts/authContext";

function App() {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  return (
    <>
      <AuthContext.Provider value={[currentUser, setCurrentUser]}>
        <NavBar />
        <LoginPage isRegister={false} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
