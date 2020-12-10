import React from "react";
import styled from "styled-components";
import { useState } from "react";
import "./Slider.css";

const sliderThumbStyles = (props) => `
width: 25px;
height: 25px;
background: ${props.color};
outline: 5px solid #333;
opacity: ${props.opacity}
`;

const MiniSlid = (props) => {



  const [value, setValue] =  useState(2);

  const handleOnChange = (e) => {
    setValue(e.target.value);
   props.setVar(e.target.value);
  };
    


  return (
    <div>
        <input
          type="range"
          min={1}
          max={5}
          value={value}
          class="slider"
          onChange={handleOnChange}/>
      <div className="value" style={{fontWeight: "lighter",}}>{value}</div>
    </div>
  );
};
export default MiniSlid;
