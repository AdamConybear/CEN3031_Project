import React from "react";
import { Link } from "react-router-dom";
import gator from "../../assets/lilgator.png";
import "./Header.css";

const Header = () => {
  return (
    <div className="header">
      <Link to="/Home" className="logo-header">
        <div className="logoAndName">
         <img className="gatorLogo" src={gator} alt="logo"/>
         <div className="gatorRater">Gator Rater</div>
        </div>
      </Link>

      <div class="header-right">
        <div><Link className="linkTo" to="/Week">Weekly Schedule</Link></div>
        <div className="separator">|</div>
        <Link class="linkTo" to="/WhatIf">What-If</Link>
        <div className="separator">|</div>
        <Link class="linkTo" to="/Resources">Resources</Link>
        <div className="separator">|</div>
        <Link class="linkTo" to="/CommentBoard">Comment Board</Link>
        <div className="separator">|</div>
        <a className="linkTo">Signout</a>
      </div>
    </div>
  );
};

export default Header;
