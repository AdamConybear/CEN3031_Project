import React from "react";
import PopUp from "../../components/PopUp/PopUp";
import { useState, useEffect, setState } from "react";
import TipPopUp from "../../components/Tips/TipPopUp";
import SleepGraph from "../../components/Graphs/SleepGraph";
import Stress from "../../components/Graphs/StressGraph";
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
  const getName = () => {
    return <h1>Welcome Adam Conybear</h1>;
  };

  return (
    <div class="home">
      <TipPopUp />
      <div>
        <button onClick={handleOpen}>Open Pop</button>
        {isOpen ? getPop() : null}
      </div>
      {!isOpen ? getName() : null}
      <div class="graph" style={{ justifyContent: "center" }}>
        <SleepGraph style={{ padding: "50px" }} />

        <Stress style={{ padding: "50px" }} />
      </div>
    </div>
  );
};

export default Home;
