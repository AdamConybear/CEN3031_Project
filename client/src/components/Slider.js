import React from "react";
import styled from "styled-components";
import { useState } from "react";

const sliderThumbStyles = (props) => `
width: 25px;
height: 25px; 
background: ${props.color};
outline: 5px solid #333;
opacity: ${props.opacity}
`;

const Styles = styled.div`
  display: felx;
  align-items: center;
  margin-top: 2rem;
  margin-bottom: 2rem;
  .value {
    flex: 1;
    font-size: 2rem;
  }
  .slider {
    flex: 6;
    -webkit-appearance: none;
    border-radius: 5px;
    background: #efefef;
    outline: none;
    color: #ff0000;
    &::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      ${(props) => sliderThumbStyles(props)}
    }
    &::-moz-range-thumb {
      ${(props) => sliderThumbStyles(props)}
    }
  }
`;

const Slider = (props) => {
  const [value, setValue] = useState(5);

  const handleOnChange = (e) => {
    setValue(e.target.value);
    props.setVar(e.target.value);
  };

  return (
    <Styles>
      <input
        type="range"
        min={0}
        max={10}
        value={value}
        classname="slider"
        onChange={handleOnChange}
      />
      <div className="value">{value}</div>
    </Styles>
  );
};
export default Slider;
