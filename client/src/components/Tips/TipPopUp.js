import React from "react";
import Tips from "./Tips";
import "./TipPopUp.css";
import { useState, useEffect, setState } from "react";

const TipPopUp = () => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const getPop = (e) => {
    return <Tips setOpen={setOpen} />;
  };

  return (
    <div>
      <button onClick={handleOpen}>Open Tip</button>
      {isOpen ? getPop() : null}
    </div>
  );
};

export default TipPopUp;
