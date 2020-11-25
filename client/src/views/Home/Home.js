import React from "react";
import PopUp from "../../components/PopUp/PopUp";
import { useState, useEffect, setState } from "react";
import TipPopUp from "../../components/Tips/TipPopUp";
import Graph from "../../components/Graphs/Graph";
import PieChartComponent from "../../components/Graphs/PieChartComponent";
import "./Home.css";
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Home = () => {
  const [isOpen, setOpen] = useState(false);

  const { user } = useAuth0();
  const { nickname, first_name , is_new } = user;
  console.log(user);
  console.log(first_name);

  if (is_new) {
    //add user to db

  }

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const addUser = () => {

    const userData = {
      id: 1,
      role: "admin",
      popups: [],
      assignments: []
    };

    let address = process.env.ADDRESS || "http://localhost:5000/api/user";
    axios
      .post(address, userData)
      .then((res) => console.log(res.data))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });



  }

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
      <div>
        <button onClick={addUser}>Add User</button>
      </div>



      <div class="graphsParent">
        <div class="pieWelcomeParent">
          <div class="welcome">Welcome back, {nickname}</div>
          <div class="pieParent"><PieChartComponent/></div>
        </div>
        <div class="sleepgraph"><Graph/></div>
      </div>


      </div>
  );
};

export default Home;
