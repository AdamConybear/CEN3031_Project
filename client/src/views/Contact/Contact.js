import React from "react";
import "./Contact.css";
import link from "../../assets/linked.jpg";
import insta from "../../assets/insta.png";
import twitter from "../../assets/twitter.png";
const Contact = () => {

return (

<div>
<div className = "contact-title">Contact Us</div>
<div className = "contact-welcome">
  <div className = "contact-sub">We'd Love to hear from you!</div>
  <br></br>
  <div className = "contact-info">If you have any questions, comments or concerns we can be reached at...</div>
  <br></br>
  <div>
    <img src = {insta} className="contact-icon"></img>
    <img src = {twitter} className="contact-icon"></img>
    <img src = {link} className="contact-icon"></img>
  </div>
  </div>
</div>

);


}
export default Contact;