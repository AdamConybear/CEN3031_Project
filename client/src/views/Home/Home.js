import React from "react";
import PopUp from "../../components/PopUp/PopUp";
import { useState, useEffect, setState } from "react";

import "./Home.css";

const Home = () => {
  const [isOpen, setOpen] = useState(false);

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };
  const getPop = (e) => {
    return <PopUp setOpen={setOpen} />;
  };

  return (
    <div class="home">
      <div>
        <button onClick={handleOpen}>Open Pop</button>
        {isOpen ? getPop() : null}
      </div>
    </div>
  );
};

export default Home;
