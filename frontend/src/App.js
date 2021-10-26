import HomePage from "./views/Home/HomePage";
import LoginPage from "./views/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./views/Profile/ProfilePage";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import ProvideAuth from "./components/Authentication/ProvideAuth";
import CodePage from "./views/Code/CodePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <>
      <ProvideAuth>
        <Router forceRefresh={false}>
          <Navbar />
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
            <Route exact path="/code">
              <CodePage />
            </Route>
          </Switch>
        </Router>
      </ProvideAuth>
    </>
  );
}
