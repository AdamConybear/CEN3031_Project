import React from "react";
import PopUp from "../../components/PopUp/PopUp";
import { useState } from "react";
import TipPopUp from "../../components/Tips/TipPopUp";
import Graph from "../../components/Graphs/Graph";
import PieChartComponent from "../../components/Graphs/PieChartComponent";
import "./Home.css";
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

const Home = () => {
  const [isOpen, setOpen] = useState(false);

  const { user } = useAuth0();
  const { nickname, first_name , is_new, sub, is_admin } = user;
  console.log(user);
  // console.log(first_name);

  if (is_new) {
    //add user to db

  }

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const addUser = () => {

    let role;
    if (is_admin){
      role = "admin"
    }else{
      role = "user"
    }

    
    const testPopData = {
      stress: 7,
      sleep: 7,
      exercise: false
    };

    const userData = {
      id: sub,
      role: role,
      popups: [testPopData],
      assignments: []
    };

    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }
    axios
      .post(address + "/api/user/user", userData)
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
    <div className="home">
      <TipPopUp />
      <div>
        <button onClick={handleOpen}>Open Pop</button>
        {isOpen ? getPop() : null}
      </div>
      <div>
        <button onClick={addUser}>Add User</button>
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
