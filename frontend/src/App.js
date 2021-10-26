import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import NavBar from "./components/NavBar/NavBar";
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
            <Route exact path="/profile">
              <Profile />
            </Route>
          </Switch>
        </Router>
      </ProvideAuth>
    </>
  );
}

export default App;
