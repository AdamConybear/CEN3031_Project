import React from "react";
import "./Radio.css";
import { useState, setState } from "react";

const Radio = ({setEx}) => {

  const handleYesChange = (e) => {
    e.preventDefault();
    setEx(true);
  }
  const handleNoChange = (e) => {
    e.preventDefault();
    setEx(false);
  }

return (
    <div class="parent">
      <button class="yes" onClick={handleYesChange}><div class="inside">Yes</div></button>
      <button class="no"  onClick={handleNoChange}><div class="inside">No</div></button>
    </div>
  );
};
export default Radio;
