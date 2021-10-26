import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./views/ProfilePage";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import ProvideAuth from "./components/Authentication/ProvideAuth";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <>
      <ProvideAuth>
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
            <PrivateRoute exact path="/profile">
              <Profile />
            </PrivateRoute>
          </Switch>
        </Router>
      </ProvideAuth>
    </>
  );
}

export default App;
