import React from "react";
import { useState } from "react";
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

    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }
    axios
      .post( address + '/api/popups', DailyData)
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
          Hi, {userName}! This is your daily check-in!{" "}
          {moment(Date()).format("dddd, MMMM Do YYYY")}
        </header>
        <div className="content">
          <label>How stressed are you today?</label>
          <div className="fixRadio">
            <Slider setVar={setStress} />
          </div>

          <label>How many hours of sleep did you get?</label>
          <div className="fixRadio">
            <Slider setVar={setSleep} />
          </div>

          <label>Did you exercise today?</label>
          <div className="fixRadio">
            <Radio setEx={setEx} />
          </div>
        </div>
        <button class="dialogButton" onClick={handleClick}>
          Submit
        </button>
      </div>
    </div>
  );
};
export default PopUp;
