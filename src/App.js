import React from "react";
import "./App.css";
import {netflixOrginals,Action} from "./Urls"
import Banner from "./Components/Banner/Banner";
import NavBar from "./Components/NavBar/NavBar";
import RowPost from "./Components/Rowpost/RowPost";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
      <RowPost url={netflixOrginals} title="Netflix Originals" />
      <RowPost url={Action} title="Action" isSmall />
    </div>
  );
}

export default App;
