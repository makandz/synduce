import HomePage from "./views/HomePage";
import LoginPage from "./views/LoginPage";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <div style={{ display: "flex", flexFlow: "column", height: "100%" }}>
      <NavBar />
      <LoginPage isRegister={false}/>
    </div>
  );
}

export default App;
