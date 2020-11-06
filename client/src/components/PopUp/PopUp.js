import React, { Component } from "react";
import { useState, setState } from "react";

import Slider from "../Slider";
import "./PopUp.css";
import Radio from "../Radio/Radio";

const PopUp = (props) => {
  const [stress, setStress] = useState(5);
  const [sleep, setSleep] = useState(5);
  const [exercise, setEx] = useState(true);

  const handleClick = () => {
    props.setOpen(false);

    // e.preventDefault();

    const DailyData = {
      userID: 0,
      stress: stress,
      sleep: sleep,
      exercise: exercise,
    };

    console.log(DailyData);
  };

  return (
    <div class="dialogStyles">
      <label class="sam">How stressed are you today?</label>
      <Slider setVar={setStress} />

      <label>How many hours of sleep did you get?</label>
      <Slider setVar={setSleep} />

      <label>Did you exercise today?</label>
      <Radio setEx={setEx} />

      <button class="dialogButton" onClick={handleClick}>
        Submit
      </button>
    </div>
  );
};
export default PopUp;
