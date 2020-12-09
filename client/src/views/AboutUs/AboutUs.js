import React from "react";
import "./AboutUs.css";
import People from "../../components/People/People"


import { useState, useEffect, setState } from "react";

const AboutUs = () => {
 
  return (
    <div>
      <div class = "about-title">About Us</div>
        <div class = "about-card">As students, we understand how overwhelming it can be to juggle classes. Advising appointments are to some degree helpful, but they do not give students the information that they are truly looking for. Too often, students bite off more than they can chew, and they are plunged into a pit of stress and frustration. A large percentage of students are either forced to withdraw from classes and take them again or must accept a satisfactory grade. This not only discourages individuals out of a certain major, but places intrinsic chains on their ability to succeed. We have created an app that is individualized to each student that can gauge their level of stress, provide resources to help, and organize their week.
      </div>
      <People/> 
    </div>
  );
};

export default AboutUs;
