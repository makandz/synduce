import HomePage from "./views/Home/HomePage";
import LoginPage from "./views/Login/LoginPage";
import Navbar from "./components/Navbar/Navbar";
import ProfilePage from "./views/Profile/ProfilePage";
import PrivateRoute from "./components/Authentication/PrivateRoute";
import ProvideAuth from "./components/Authentication/ProvideAuth";
import CodePage from "./views/Code/CodePage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterPage from "./views/Register/RegisterPage";
import ProjectsPage from "./views/Projects/ProjectsPage";

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
              <LoginPage />
            </Route>
            <Route exact path="/register">
              <RegisterPage />
            </Route>
            <PrivateRoute exact path="/profile">
              <ProfilePage />
            </PrivateRoute>
            <PrivateRoute exact path="/projects">
              <ProjectsPage />
            </PrivateRoute>
            <Route path="/code/:token" component={CodePage} />
            <Route path="/code" exact component={CodePage} />
          </Switch>
        </Router>
      </ProvideAuth>
    </>
  );
}
