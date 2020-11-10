import React from "react";
import { Link } from "react-router-dom";
import gator from "../../assets/lilgator.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/Home" className="logo-header">
        <img src={gator} alt="logo" />
        <span className="logo">
          <b>Gator Rater</b>
        </span>
      </Link>

      <div className="header-right">
        <Link to="/Week">Weekly Schedule</Link>
        <Link to="/WhatIf">What-If</Link>
        <Link to="/Resources">Resources</Link>
        <Link to="/CommentBoard">Comment Board</Link>
        <a>Signout</a>
      </div>
    </div>
  );
};

export default Header;
