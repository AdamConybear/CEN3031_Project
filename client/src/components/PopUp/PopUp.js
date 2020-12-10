import React, { Component } from "react";
import { useState, setState } from "react";
import axios from "axios";
import Slider from "../Slider/Slider";
import "./PopUp.css";
import Radio from "../Radio/Radio";
import moment from "moment";
import { useAuth0 } from '@auth0/auth0-react';

const PopUp = (props) => {
  const [stress, setStress] = useState(5);
  const [sleep, setSleep] = useState(5);
  const [exercise, setEx] = useState(true);

  const { user } = useAuth0();
  const { sub } = user;

  const handleClick = () => {
    const DailyData = {
      stress: stress,
      sleep: sleep,
      exercise: exercise,
    };
    props.setOpen(false);
    console.log(DailyData);

    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }

    axios
      .post(address + "/api/user/popup", DailyData, {
        params: {
          id: sub
        },
      })
      .then((res) => console.log(res.data))
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  const userName = "Adam";

  return (
    <div className="modalx">
      <div className="modal_contentx">
        <header className="daily">
          <div class="welcomee">Welcome back, {userName}</div>
          <div class="date">{moment(Date()).format("dddd, MMMM Do YYYY")}</div>
        </header>
        <div className="content">
          <label class="question">How stressed are you today?</label>
          <div class="sliderCompanions">
            <div style={{paddingRight: "15px", fontWeight: "lighter",}}>0</div>
            <Slider setVar={setStress}/>
            <div style={{paddingLeft: "15px", fontWeight: "lighter",}}>10</div>
          </div>

          <label class="question">How many hours of sleep did you get?</label>
          <div class="sliderCompanions">
            <div style={{paddingRight: "15px", fontWeight: "lighter",}}>0</div>
            <div class="huh"><Slider setVar={setSleep} /></div>
            <div style={{paddingLeft: "15px", fontWeight: "lighter",}}>10</div>
          </div>

          <label class="question">Did you exercise today?</label>
          <div class="huh"><Radio setEx={setEx}/></div>
        </div>

        <div class="containerr" onClick={handleClick}>
	         <p class="animated-word">Submit</p>
        </div>
      </div>
    </div>
  );
};
export default PopUp;
