import React from "react";
import "./Radio.css";
import { useState } from "react";

const Radio = (props) => {
  const [value, setValue] = useState(true);

  const handleOnChangeNo = (e) => {
    console.log("radio is ");

    setValue(false);
    props.setEx(false);
  };

  return (
    <div class="b">
      <label class="container">
        Yes
        <input type="radio" checked="checked" name="radio"></input>
        <span class="checkmark"></span>
      </label>
      <label class="container">
        No
        <input type="radio" name="radio" onChange={handleOnChangeNo}></input>
        <span class="checkmark"></span>
      </label>
    </div>
  );
};
export default Radio;
