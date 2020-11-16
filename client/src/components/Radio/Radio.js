import React from "react";
import "./Radio.css";

const Radio = ({setEx}) => {

  const handleYesChange = (e) => {
    e.preventDefault();
    setEx(e.target.checked)

  }
  const handleNoChange = (e) => {
    e.preventDefault();
    setEx(e.target.checked)

  }


  return (
    <div class="b">
      <label class="container">
        Yes
        <input type="radio" checked="checked" name="radio" onChange={handleYesChange}></input>
        <span class="checkmark"></span>
      </label>
      <label class="container">
        No
        <input type="radio" name="radio" onChange={handleYesChange}></input>
        <span class="checkmark"></span>
      </label>
    </div>
  );
};
export default Radio;
