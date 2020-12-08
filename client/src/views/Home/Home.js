import React from "react";
import PopUp from "../../components/PopUp/PopUp";
import { useState } from "react";
import TipPopUp from "../../components/Tips/TipPopUp";
import Graph from "../../components/Graphs/Graph";
import PieChartComponent from "../../components/Graphs/PieChartComponent";
import "./Home.css";
import { useAuth0 } from '@auth0/auth0-react';
// import axios from 'axios';

const Home = () => {
  const [isOpen, setOpen] = useState(false);

  const { user } = useAuth0();
  const { nickname, sub } = user;
  console.log(user);
  // console.log("First name: " + first_name);

  
  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  
  const getPop = (e) => {
    return <PopUp setOpen={setOpen} />;
  };

  return (
    <div className="home">
      <TipPopUp />
      <div>
        <button onClick={handleOpen}>Open Pop</button>
        {isOpen ? getPop() : null}
      </div>



      <div className="graphsParent">
        <div className="pieWelcomeParent">
          <div className="welcome">Welcome back, {nickname}</div>
          <div className="pieParent"><PieChartComponent/></div>
        </div>
        <div className="sleepgraph"><Graph/></div>
      </div>


      </div>
  );
};

export default Home;
