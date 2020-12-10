import React from "react";
import "./Contact.css";
const Contact = () => {
  return (
    <div>
      <div class="titleC">Contact Us</div>
      <div class="contactContainer">
        <div class="we">We'd love to hear from you!</div>
        <div>If you have any questions, comments or concerns, feel free to contact us</div>
        <a href={"mailto:" + "wearegatorrater@gmail.com"}>wearegatorrater@gmail.com</a>
      </div>
    </div>
  );
};
export default Contact;
