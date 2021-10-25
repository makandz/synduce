import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <LoginPage isRegister={true} />
    </>
  );
}

export default App;
