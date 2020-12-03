import React, { Component } from "react";
import { useState, setState } from "react";
import axios from "axios";

import Slider from "../Slider";
import "./PopUp.css";
import Radio from "../Radio/Radio";
import moment from "moment";

const PopUp = (props) => {
  const [stress, setStress] = useState(5);
  const [sleep, setSleep] = useState(5);
  const [exercise, setEx] = useState(true);

  const handleClick = () => {
    const DailyData = {
      userID: 0,
      stress: stress,
      sleep: sleep,
      exercise: exercise,
    };
    props.setOpen(false);
    console.log(DailyData);

    let address = process.env.ADDRESS || "http://localhost:5000/api/popups";
    axios
      .post(address, DailyData)
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
