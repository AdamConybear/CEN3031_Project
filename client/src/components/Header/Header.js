import React from "react";
import { Link } from "react-router-dom";
import gator from "../../assets/lilgator.png";
import "./Header.css";
import { useAuth0 } from '@auth0/auth0-react'

const Header = () => {

  const { loginWithRedirect , isAuthenticated, logout } = useAuth0();

  let authPage;

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // dev code
      authPage = "http://localhost:3000/Auth";
  } else {
      // production code
      authPage = "https://lit-anchorage-94851.herokuapp.com/#/Auth";
  }
  // console.log(isAuthenticated);
  return (
    <div className="header">
      <Link to="/Home" className="logo-header">
        <div className="logoAndName">
         <img className="gatorLogo" src={gator} alt="logo"/>
         <div className="gatorRater">Gator Rater</div>
        </div>
      </Link>

      <div className="header-right">
        <div><Link className="linkTo" to="/Week">Weekly Schedule</Link></div>
        <div className="separator">|</div>
        <Link className="linkTo" to="/WhatIf">What-If</Link>
        <div className="separator">|</div>
        <Link className="linkTo" to="/Resources">Resources</Link>
        <div className="separator">|</div>
        <Link className="linkTo" to="/CommentBoard">Comment Board</Link>
        <div className="separator">|</div>
        {isAuthenticated &&(
          <a className="linkTo" onClick={()=>{logout({returnTo: authPage})}}>Logout</a> 
        ) }
        {!isAuthenticated && (
          <a className="linkTo" onClick={()=> loginWithRedirect()}>Login</a>
        )}
      </div>
    </div>
  );
};

export default Header;
