import React from "react";
import { useState, setState } from "react";
import "./Quiz.css";
import MiniSlid from "../Slider/MiniSlid";
import { useAuth0 } from '@auth0/auth0-react';

import Radio from "../Radio/Radio";


const Quiz = (props) => {
  const [initial, setInitial] = useState(true);
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(false);
  const [fourth, setFourth] = useState(false);
  const [fifth, setFifth] = useState(false);

  const [grade, setGrade] = useState(1);
  const [easy, setEasy] = useState(3);
  const [time, setTime] = useState(2);
  const [stress, setStress] = useState(2);
  const [exercise, setEx] = useState(true);

  const { user } = useAuth0();
  const { nickname } = user;


  const userName = nickname;


 const handleClick = (e) => {

  const UserData = {
    grade: grade,
    stress: stress,
    time: time,
    exercise: exercise,
    easy: easy
  };

  props.setOpenQuiz(false);
  console.log(UserData);

 }

 const firstq = (e) => {
   e.preventDefault(); 
   setFirst(true);
   setInitial(false);
 }
 const secondq = (e) => {
  e.preventDefault(); 
  setSecond(true);
  setFirst(false);
}

const thirdq = (e) => {
  e.preventDefault(); 
  setThird(true);
  setSecond(false);
}
const fourthq = (e) => {
  e.preventDefault(); 
  setThird(false);
  setFourth(true);

}
const fifthq = (e) => {
  e.preventDefault(); 

  setFourth(false);
  setFifth(true);

}


const getInitial = () => {
  return (
    <div>
    <div class = "initialS">
 
      <br></br>
      <div class = "space">
    <div class = "animated-word-initial" onClick = {firstq}>Click to Begin</div>
    {first? getFirst() : null}
    </div>
    </div>
    </div>
  );
}
const getFirst = () => {

  return (
    <div classname = "modal">
         <div classname = "modal_content">
       <label class="question">What year are you?</label>
          <div class="sliderCompanions">
            <div style={{paddingRight: "15px", fontWeight: "lighter",}}>1</div>
            <MiniSlid setVar = {setGrade}/>
            <div style={{paddingLeft: "15px", fontWeight: "lighter",}}>5</div>
          </div>
          <br></br>
          <div class = "space">
          <div class = "animated-word" onClick = {secondq}>Next</div>
          {second? getSecond() : null}
           
           </div>
          </div>
          </div>
  );
}

const getSecond = () => {
 return (
       <div classname = "modal">
         <div classname = "modal_content">
        
          <label class="question">How well do you handle stress?</label>
          <div class="sliderCompanions">
            <div style={{paddingRight: "15px", fontWeight: "lighter",}}>1</div>
            <MiniSlid setVar={setStress}/>
            <div style={{paddingLeft: "15px", fontWeight: "lighter",}}>5</div>
          </div>
          <br></br>
          <div class = "space">
          <div class = "animated-word" onClick = {thirdq}>Next</div>
          </div>
         
          </div>
          </div>
 );
}

const getThird = () => {
return (
  <div classname = "modal">
  <div classname = "modal_content">
 
   <label class="question">How fast of a worker are you?</label>
   <div class="sliderCompanions">
     <div style={{paddingRight: "15px", fontWeight: "lighter",}}>1</div>
     <MiniSlid setVar={setTime}/>
     <div style={{paddingLeft: "15px", fontWeight: "lighter",}}>5</div>
   </div>
   <br></br>
   <div class = "space">
   <div class = "animated-word" onClick = {fourthq}>Next</div>
   </div>
  
   </div>
   </div>
);
}

const getFourth = () => {
return (
  <div classname = "modal">
  <div classname = "modal_content">
           <label class="question">How easily do you comprehend what you are taught in class?</label>
           <div class="sliderCompanions">
             <div style={{paddingRight: "15px", fontWeight: "lighter",}}>1</div>
            <MiniSlid setVar={setEasy}/>
           <div style={{paddingLeft: "15px", fontWeight: "lighter",}}>5</div>
           </div>
           <br></br>
           <div class = "space">

           <div class = "animated-word" onClick = {fifthq}>Next</div>

           </div>
          </div>
          </div>
);

}         

const getFifth = () => {

  return (
    <div classname = "modal">
       <div classname = "modal_content"></div>
           <label class="question">Is exercise part of your everyday life?</label>
         

          <div class="space">
            <Radio setEx={setEx}/>
            </div>
           <div class="containerr" onClick={handleClick}>
       
	          <p class="animated-word">Submit</p>
          
         </div>
        </div>
        
  );

}




return(
  <div className="modal">
      <div className="modal_content">
        <header className="daily">
          <div class="welcomee">Welcome to Gator Rater, {userName}</div>
        </header>
        {initial ? getInitial() : null}
        {first? getFirst() : null}
        {second? getSecond() : null}
        {third? getThird() : null}
        {fourth? getFourth() : null}
        {fifth? getFifth(): null}
      
        <div className="content">

        </div>
      

        
      </div>
</div>

  );

}
export default Quiz; 