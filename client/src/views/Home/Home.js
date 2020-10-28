import React, { useState } from "react";
import "./Home.css";

const Home = () => {
  const [open, setOpen] = useState(false);

  const test = () => {
    // console.log("testing");
    return <h2>Testing the test</h2>;
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  return (
    <div>
      <h1> Dashboard goes here</h1>
      <button onClick={handleOpen}>Open popup</button>
      {open ? test() : null}
    </div>
  );
};

export default Home;
