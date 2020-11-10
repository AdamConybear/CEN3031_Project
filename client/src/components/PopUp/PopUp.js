import React, { Component } from "react";
import { useState, setState } from "react";

import Slider from "../Slider";
import "./PopUp.css";
import Radio from "../Radio/Radio";
import moment from "moment";

const PopUp = (props) => {
  const [stress, setStress] = useState(5);
  const [sleep, setSleep] = useState(5);
  const [exercise, setEx] = useState(false);

  const handleClick = () => {
    const DailyData = {
      userID: 0,
      stress: stress,
      sleep: sleep,
      exercise: exercise,
    };
    props.setOpen(false);
    console.log(DailyData);
  };

  const userName = "Jeffrey";

  return (
    <div className="modalx">
      <div className="modal_contentx">
        <header className="daily">
          Hi, {userName}! This is your daily check-in!{" "}
          {moment(Date()).format("dddd, MMMM Do YYYY")}
        </header>
        <div className="content">
          <label>How stressed are you today?</label>
          <Slider setVar={setStress} />

          <label>How many hours of sleep did you get?</label>
          <Slider setVar={setSleep} />

          <label>Did you exercise today?</label>
          <Radio setEx={setEx} />
        </div>
        <button class="dialogButton" onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default PopUp;
