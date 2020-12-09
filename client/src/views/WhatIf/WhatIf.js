import React from "react";
import "./WhatIf.css";
import axios from 'axios';
import { useState, setState } from "react";

const WhatIf = () => {
  var classesArray = [];
  var teacherArray = [];
  var newClassesArray = [];
  var classesInSchedule = [];
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [showDiv, setShowDiv] = useState(false);
  const [submit, isSubmitted] = useState(false);
  const [valid, SearchisValid] = useState(false);
  const [array, setArray] = useState([]);
  const [teacher, setTeacher] = useState("");
  const [code, setCode] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [postVal, setPostVal] = useState("");
  const checkAPI = (props) => {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    console.log(props);
    const base = 'https://one.ufl.edu/apix/soc/schedule/?category=CWSP&course-code='
    const mid = props;
    const end = '&term=2208';
    const url = proxyUrl + base + mid + end;
    axios.get(url).then((value) => {
      console.log(value);
        if (value["data"][0]["COURSES"].length != 0){
          console.log("exists");
          setCode(props);
          getProfessors(value["data"][0]["COURSES"]);
        }
        else {
          console.log("not a class");
        //  return false;
        }
    }).catch((err)=> {
    console.log(err);
    });
  }
  const getProfessors = (props) => {
    var profs = new Set();
    //console.log("samantha");
   const size = props.length;
   for (var i = 0; i < size; i ++){
    var teachers = props[i]["sections"][0]["instructors"].length;
    for (var j = 0; j < teachers; j++){
          profs.add(props[i]["sections"][0]["instructors"][j]["name"])
    }
   }
   profs.forEach(v => teacherArray.push(v));
   setArray(teacherArray);
  }


  const togglePop = () => {
    document.getElementById("hideMe").style.display = "none";
    document.getElementById("popupAdd").classList.toggle("active");
  };






  const togglePopup = (props) => {
    document.getElementById("restartText").value = " ";
    document.getElementById("professorInput").value = "";
    setArray([]);
    document.getElementById("popupAdd").classList.toggle("active");
    if (props){  appendData();  }
  };








  const getFilteredClubs = (filterText, array) => {
    console.log(array);
    let results = [];
    results = array.filter((Course) => {
      return (
          filterText.length > 0 &&
          Course.toLowerCase().indexOf(filterText.toLowerCase().trim()) !== -1
      );
  });
  console.log(results);
  return results;
  };
  const getFilterText = (event) => {
    console.log(event.target.value);
    console.log(array);
    setFilteredClubs(getFilteredClubs(event.target.value, array))
   }
  function setCourseField(name) {
    setTeacher(name);
    document.getElementById("professorInput").value = name;
  }
  const buildingList = filteredClubs.length === 0 ? array.map((Course) => {
      return (
        <div key={Course}>
          <div class="dontDisplay"> {"."} </div>
        </div>
      );
    })
      : filteredClubs.map((Course) => {
        document.getElementById("hideMe").style.display = "block";
        return (
          <div key={Course}>
            <div class="displayIt" onClick={() =>
              { document.getElementById("hideMe").style.display = "none";
                setCourseField(Course);
              }
              }>
              {Course}
            </div>
          </div>
        );
  });
  const getDiv = (e) => {
    e.preventDefault();
    setShowDiv(true);
  }
const handleTrash = (props) => {
  console.log("trying to delete");
  console.log(displayData);
  const size = displayData.length;
  console.log(size);
   for (let i = 0; i < props; i++){
       newClassesArray.push(displayData[i]);
   }
   for (let j = props+1; j < size; j++){
    newClassesArray.push(displayData[j]);
   }
   setDisplayData(newClassesArray);
}
  const appendData = () => {
    console.log(displayData);
    classesArray = displayData;
    const obj = {
      indx: classesInSchedule.length,
      class: code,
      prof: teacher
    }
    classesInSchedule.push(obj);
    classesArray.push(obj);
    setDisplayData(classesArray);
    console.log(displayData);
  }
const getTryAgain = () => {
  console.log("retyrn try again");
  return (
  <div class invalid>invalid course code! Try again</div>
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

             <div class="ui icon input">
               <input onKeyDown = {(ev)=> {
                 if (ev.key === "Enter"){
                     isSubmitted(true);
                     checkAPI(ev.target.value);
                 }
               }}
                class = "popUpInputField" id = "restartText"  type = "text" placeholder = "Type to filter..">
             </input>
             </div>

          </div>
          </div>
          <p class="lbl">Professor:</p>
          <div class = "center">
            <input
              class="popUpInputField"
              type="text"
              placeholder="  Professor..."
              id="professorInput"
              onChange = {getFilterText}
            />
            <div id="hideMe" class="above">{buildingList}</div>
          </div>

        </div>
        <div class="cancelSubmit">
          <button class="cancel" onClick={() => togglePopup()}>Cancel</button>
          <button class="submit" onClick={() => togglePopup(true)} >Submit</button>
        </div>
      </div>
      </div>
      <div class = "whatIfTitle">What If</div>
      <div class="semAverage">
        <div>Semester's Stress:</div>
        <div class="bold">0.0</div>
      </div>
      <div onClick={() => togglePop()} class="addClass">Add a Class</div>
      <div>
      </div>
      <div class = "classesContainer">
      {displayData.map((obj)=> {
        return (
          <div id = "display-data" className = "classBox">
          <div className="courseOnBox">
            {obj.class.toUpperCase()}
          </div>
          <div className="profOnBox">
            {obj.prof}
          </div>
          <div className="stressRate">0.0</div>
          <div className="controls">
            <div className="trash" onClick={() => handleTrash(obj.indx)}></div>
            <div className="goToComment"></div>
          </div>

          </div>
        );
        })}
        </div>
  </div>
);
};
export default WhatIf;
