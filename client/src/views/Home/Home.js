import React from "react";
import PopUp from "../../components/PopUp/PopUp";
import { useState } from "react";
import TipPopUp from "../../components/Tips/TipPopUp";
import Graph from "../../components/Graphs/Graph";
import PieChartComponent from "../../components/Graphs/PieChartComponent";
import "./Home.css";

const Home = () => {
  const [isOpen, setOpen] = useState(false);
  
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const getPop = (e) => {
    return <PopUp setOpen={setOpen} />;
  };
  return (
    <div class="home">
      <TipPopUp />
      <div>
        <button onClick={handleOpen}>Open Pop</button>
        {isOpen ? getPop() : null}
      </div>



      <div class="graphsParent">
        <div class="pieWelcomeParent">
          <div class="welcome">Welcome back, Adam</div>
          <div class="pieParent"><PieChartComponent/></div>
        </div>
        <div class="sleepgraph"><Graph/></div>
      </div>


      </div>
  );
};

export default Home;
