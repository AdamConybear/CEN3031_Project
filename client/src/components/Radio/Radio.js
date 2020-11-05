import React from "react";
import "./Radio.css";

const Radio = (props) => {
  return (
    <div class="b">
      <label class="container">
        Yes
        <input type="radio" checked="checked" name="radio"></input>
        <span class="checkmark"></span>
      </label>
      <label class="container">
        No
        <input type="radio" name="radio"></input>
        <span class="checkmark"></span>
      </label>
    </div>
  );
};
export default Radio;
