import React, { Component } from "react";
import { useState, setState } from "react";

import Slider from "../Slider";
import "./Tips.css";
import Radio from "../Radio/Radio";
import styled from "styled-components";

const TipPop = styled.div`
  height: 300px;
  width: 500px;
  background: #d59a69;
  //padding: 10px;
  //margin: 8px;
  //display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 20px;
  box-shadow: 0 2px 4px black;
  //position: fixed;
  transition: transform 0.2s; /* Animation */

  margin-top: 5%;
  //border-radius: 10px;
  margin-left: 30%;
  margin-right: 30%;
  margin: "0 auto";
  position: "fixed";
  left: "50%";
  top: "50%";
  transform: "translate(-50%,50%)";
  z-index: "999";
  //background-color: #eee;
  padding: "10px 20px 40px";

  display: "flex";
  flex-direction: column;
`;

const Tips = (props) => {
  const TipList = ["Drink a glass of water first thing in the morning"];
  const [stress, setStress] = useState(5);
  const [sleep, setSleep] = useState(5);
  const [exercise, setEx] = useState(true);

  const handleClick = () => {
    props.setOpen(false);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <TipPop>
        TipList[Math.random() * (TipList.length - 1)]
        <button class="dialogButton" onClick={handleClick}>
          Dismiss
        </button>
      </TipPop>
    </div>
  );
};
export default Tips;
