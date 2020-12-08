import React from "react";
import "./WhatIf.css";
import { useState, setState } from "react";
import axios from 'axios';


const WhatIf = () => {
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [showDiv, setShowDiv] = useState(false);
  const [submit, isSubmitted] = useState(false);
  // class Course {
  //   constructor(name, level) {
  //     this.name = name;
  //     this.level = level;
  //   }
  // }


  const checkIfValid = (props) => {
   let val = false; 
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    console.log(props);

    const base = 'https://one.ufl.edu/apix/soc/schedule/?category=CWSP&course-code='
    const mid = props;
    const end = '&term=2208';

    const url = proxyUrl + base + mid + end;
      
    const url1 = proxyUrl + 'https://one.ufl.edu/apix/soc/schedule/?category=CWSP&course-code=cen3031&term=2208';

    const url2 = proxyUrl + 'https://one.ufl.edu/apix/soc/schedule/?category=CWSP&course-code=eel3135&term=2208';
    //console.log(url1);

    axios.get(url).then((res) => {
      console.log(res.data);

      if (res.data[0]["COURSES"].length != 0){
        getProfessors()
      }

    })
    .catch((error) => {
      if (error.response) {
        console.log(error.response.data);
        console.log(error.response.status);
        console.log(error.response.headers);
      }
    });
  
    // fetch(url1).then(value => value.json())
    // .then((value) => {

    //   console.log(value);
    //   if (value[0]["COURSES"].length != 0){
    //     // val = true; 
    //     getProfessors()
    //   }
      
    //   //console.log(value);
    //   // return val; 

    // }).catch((err)=> {
    // console.log(err);
    // });

    
  }

  const getProfessors = () => {
    console.log("samantha");
  }


  // let trial1 = new Course("a dfs");
  // let trial2 = new Course("aaa sdfssd");
  // let trial3 = new Course("aass sdffsd");
  // let trial4 = new Course("lmao sdfsfsdf");
  // let trial5 = new Course("aasasa sfddsfd");
  // let trial6 = new Course("aaasd dfdf");
  // let trial7 = new Course("aasloss sdf dfsd dfdf");
  // let trial8 = new Course("otromas dfkkdlsl");
  // const data = [trial1, trial2, trial3, trial4, trial5, trial6, trial7, trial8];

  const togglePopup = () => {
    document.getElementById("popupAdd").classList.toggle("active");
  };

  /*
  FAILED ATTEMPT AT RATE MY PROFESSOR API

  var rmp = require("rmp-api");

  var callback = function(professor) {

    const src = "https://rmp-api-server.herokuapp.com/cdn/rmp-api-latest.min.js";
    if (professor === null) {
      console.log("No professor found.");
      return;
    }
    console.log("Name: " + professor.fname + " " + professor.lname);
    console.log("University: "+ professor.university);
    console.log("Quality: " + professor.quality);
    console.log("Easiness: " + professor.easiness);
    console.log("Helpfulness: " + professor.help);
    console.log("Average Grade: " + professor.grade);
    console.log("Chili: " + professor.chili);
    console.log("URL: " + professor.url);
    console.log("First comment: " + professor.comments[0]);
  };

  rmp.get("Sanethia Thomas", callback);
*/


  const getFilteredClubs = (filterText, data) => {
    let results = [];
    results = data.filter((Course) => {
      return (
          filterText.length > 0 &&
          Course.name.toLowerCase().indexOf(filterText.toLowerCase().trim()) !== -1
      );
  });
  console.log(results);
  return results;
  };

  // const getFilterText = (event) => { setFilteredClubs(getFilteredClubs(event.target.value, data)) }

  // function setCourseField(id) {
  //   document.getElementById("courseField").value = id;
  //   document.getElementById("hideMe").style.display = "none";
  // }

  // const buildingList =
  //     filteredClubs.length === 0 ? data.map((Course) => {
  //     return (
  //       <div key={Course.name}>
  //         <div class="dontDisplay"> {"."} </div>
  //       </div>
  //     );})
  //     : filteredClubs.map((Course) => {
  //       document.getElementById("hideMe").style.display = "block";
  //       return (
  //         <div key={Course.name}>
  //           <div class="displayIt" onClick={() => setCourseField(Course.name)}> {Course.name} </div>
  //         </div>
  //       );
  // });

  const getDiv = (e) => {
    e.preventDefault();
    setShowDiv(true);
  }

  const classBlock = (e) => {
    return (
      <div class="well">Block</div>
    );
  }




  return (
    <div>
    <div class="popup" id="popupAdd">
      <div class="overlay"></div>
      <div class="content">
        <div class="inputPart">
          <p class="addTitle">Add a Class</p>
          <p class="lbl">Course Code:</p>
          <div class = "center">
            <div>
             <div style={{ marginTop: "1rem" }} class="ui search fluid">
             <div class="ui icon input">
               <input onKeyDown = {(ev)=> {
                 if (ev.key ==="Enter"){
                   ev.preventDefault();
                   isSubmitted(true); 
                  //  const val = checkIfValid(ev.target.value);
                   if (checkIfValid(ev.target.value)){
                     getProfessors();
                   }
                 }
               }}
                class = "popUpInputField" type = "text" placeholder = "Type to filter..">
                </input>
             </div>
             </div>
          </div>
        
         
          
          </div>




          <p class="lbl">Professor:</p>
          <textarea
            class="popUpInputField"
            type="text"
            placeholder="Professor"
            id="professorInput"
          />
        </div>
        <div class="cancelSubmit">
          <button class="cancel" onClick={() => togglePopup()}>Cancel</button>
          <button class="submit" onClick={classBlock}>Submit</button>
        </div>
      </div>
      </div>

      <div class = "whatIfTitle">What If</div>
      <div class="semAverage">
        <div>Semester's Stress:</div>
        <div class="bold">0.0</div>
      </div>
      <div onClick={() => togglePopup()} class="addClass">Add a Class</div>
      <div >Button to Load</div>

      <div>
        <button onClick={getDiv}>Alo</button> {showDiv ? classBlock() : null}
      </div>


  </div>
);
};

export default WhatIf;