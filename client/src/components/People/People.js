import React from "react";
import "./People.css";

import adam from "../../assets/adam2.jpg";
import jeff from "../../assets/jeff.jpeg";
import sami from "../../assets/sami.jpeg";
import mack from "../../assets/mack.jpeg";
import diego from "../../assets/diego.jpeg";


const People = () =>{
return (

<div className="people-row">
  <div className = "people-col">
    <img src = {mack} className="people-img"></img>
    <h2>Mack Hummel</h2>
  </div>
  <div className = "people-col">
    <img src = {adam} className="people-img"></img>
    <h2>Adam Conybear</h2>
  </div>
  <div className = "people-col">
    <img src = {jeff} className="people-img"></img>
    <h2>Jeffrey Shim</h2>
  </div>
  <div className = "people-col">
    <img src = {sami} className="people-img"></img>
    <h2>Samantha Dorf</h2>
  </div>
  <div className = "people-col">
    <img src = {diego} className="people-img"></img>
    <h2>Diego Laya</h2>
  </div>
</div>

);

}
export default People; 
