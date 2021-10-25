import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile";
import { useState } from "react";
import { auth } from "./firebase/FireBaseAuth";
import AuthContext from "./contexts/authContext";
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  const [currentUser, setCurrentUser] = useState(auth.currentUser);

  return (
    <>
      <AuthContext.Provider value={[currentUser, setCurrentUser]}>
        <Router forceRefresh={false}>
          <NavBar />
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route exact path="/login">
              <LoginPage isRegister={false} />
            </Route>
            <Route exact path="/register">
              <LoginPage isRegister={true} />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </AuthContext.Provider>
    </>
  );
}

export default App;
