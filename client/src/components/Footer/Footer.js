import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <div class="footer">
      <div class="footerHeading">
              <Link to="/Contact">Contact</Link>
              <Link to="/AboutUs">About us</Link>
              <Link to="/Help">Help</Link>
      </div>
    </div>
  );
};

export default Footer;
