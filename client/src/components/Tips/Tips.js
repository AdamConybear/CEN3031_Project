import React, { Component } from "react";
import { useState, setState } from "react";

import Slider from "../Slider";
import "./Tips.css";
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
  const items = [
    "Drink a glass of water first thing in the morning!",
    "Make half your plate veggies!",
    "Get a fitness tracker and track your steps!",
    "Switch to non-toxic household cleaning products!",
  ];

  const handleClick = () => {
    props.setOpen(false);
  };

  const userName = "Adam";

  return (
    <div className="modal">
      <div className="modal_content">
        <span className="close" onClick={handleClick}>
          &times;
        </span>
        <div>
          <header className="tiphead">
            {userName}, your daily wellness tip is:
          </header>
          <div>{items[Math.floor(Math.random() * items.length)]}</div>
        </div>
      </div>
    </div>
  );
};
export default Tips;
