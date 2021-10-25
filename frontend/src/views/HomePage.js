import NavBar from "../components/NavBar/NavBar";
import HomePageBody from "../components/HomePageBody/HomePageBody";

const HomePage = () => {
  return (
    <div style={{"display": "flex", "flexFlow": "column", "height": "100%"}}>
      <NavBar />
      <HomePageBody />
    </div>
  );
};

export default HomePage;
