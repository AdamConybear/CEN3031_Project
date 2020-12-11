import React from "react";
import "./WhatIf.css";
import axios from 'axios';
import { useState, setState } from "react";
import { Link } from "react-router-dom";
import { getInitialColumnReorderState } from "@material-ui/data-grid";
import { TrendingUpOutlined } from "@material-ui/icons";
const WhatIf = () => {

 
  var teacherArray = [];
  var newClassesArray = [];
  var classesInSchedule = [];

 var empty = [];

  var classesArray = [];
  const [filteredClubs, setFilteredClubs] = useState([]);
  const [showDiv, setShowDiv] = useState(false);
  const [submit, isSubmitted] = useState(false);
  const [valid, SearchisValid] = useState(false);
  const [array, setArray] = useState([]);
  const [teacher, setTeacher] = useState("");
  const [code, setCode] = useState("");
  const [displayData, setDisplayData] = useState([]);
  const [postVal, setPostVal] = useState("");
  const [stress, setStress] = useState(0);


  const checkIfValid = (props) => {
    // console.log(props);
    //let val = false;
    let regex1 = "^[a-zA-Z]{3}[0-9]{4}$";
    let regex2 = "^[a-zA-Z]{3}[0-9]{4}[a-zA-Z]{1}$";
    if (props.match(regex1) || props.match(regex2))
    {
      // console.log("this is a good string");
      SearchisValid(true);
      setCode(props);
      setPostVal(props);
      checkAPI(props);
    }
    else {
      // console.log("this is a bad string");
      //getTryAgain();
      checkAPI(props);
    }
  };
  const checkAPI = (props) => {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    // console.log(props);
    const base = 'https://one.ufl.edu/apix/soc/schedule/?category=CWSP&course-code='
    const mid = props;
    const end = '&term=2208'; //fall 2020
    const url = proxyUrl + base + mid + end;
    axios.get(url).then((value) => {
      // console.log(value);
        if (value["data"][0]["COURSES"].length != 0){
          // console.log("exists");
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
  //  console.log(teacherArray);
    setArray(teacherArray);
  }
  const togglePopup = (props) => {
    document.getElementById("hideMe").style.display = "none";
    (document.getElementById("sucks").value = " ");
    document.getElementById("professorInput").value = "";
    setArray([]);
    // console.log(array);
   document.getElementById("popupAdd").classList.toggle("active");
   if (props){
     appendData();
   }
  };
  const getFilteredClubs = (filterText, array) => {
    // console.log(array);
    let results = [];
    results = array.filter((Course) => {
      return (
          filterText.length > 0 &&
          Course.toLowerCase().indexOf(filterText.toLowerCase().trim()) !== -1
      );
  });
  // console.log(results);
  return results;
  };
  const getFilterText = (event) => {
    //console.log(classesArray);
    // console.log(event.target.value);
    // console.log(array);
    setFilteredClubs(getFilteredClubs(event.target.value, array))
   }
  function setCourseField(name) {
    setFilteredClubs(empty);
  //  console.log("clicked to select proffessor");
  //  console.log(name);
    setTeacher(name);
    document.getElementById("hideMe").style.display = "none";
    document.getElementById("professorInput").value = name;
  }
  const buildingList = filteredClubs.length === 0 ? array.map((Course) => {
    // console.log("filtered is length 0");
    // console.log(filteredClubs);
      return (
        <div key={Course}>
          <div class="dontDisplay"> {"."} </div>
        </div>
      );
    })
      : filteredClubs.map((Course) => {
        // console.log("build list is");
        // console.log(filteredClubs);
        document.getElementById("hideMe").style.display = "block";
        return (
          <div key={Course}>
            <div class="displayIt" onClick={() =>
              setCourseField(Course)}> {Course}  </div>
          </div>
        );
  });
  const getDiv = (e) => {
    e.preventDefault();
    setShowDiv(true);
  }

  const handleTrash = (index) => {
    // console.log(index);
    // console.log("trying to delete");
    // console.log(displayData);
    const size = displayData.length;
    // console.log(size);

    for (let i = 0; i < size; i++ ){
      if (i !== index) {
        newClassesArray.push(displayData[i]);
      }
    }

    //  for (let i = 0; i < index; i++){
    //      newClassesArray.push(displayData[i]);
    //  }
    //  for (let j = index+1; j < size; j++){
    //   newClassesArray.push(displayData[j]);
    //  }
    setStress(stress - displayData[index].stress);
    setDisplayData(newClassesArray);
     
  }
    
  const appendData = () => {
    // console.log(displayData);
    classesArray = displayData;
    const obj = {
      stress: getClassStress(),
      indx: classesInSchedule.length,
      class: code,
      prof: teacher
    }
    classesArray.push(obj);
    classesInSchedule.push(obj);
    setDisplayData(classesArray);
    // console.log(displayData);
  }
  const getClassStress = () => {

    let tempStress = 0;
    let mult;
    // console.log(code.charAt(1));
    if (code.charAt(4) === "4") {
      tempStress += 1;
      mult = 1;
    } else if (code.charAt(4) === "3") {
      // console.log("has a 3 ");
      tempStress += 0.75;
      mult = 0.5;
    } else {
      tempStress += 0.25;
      mult = 0.25;
    }
    // Fill in later with more specific algo
  
    if (code.toUpperCase().charAt(1) === 'P') {
      tempStress += 0.75;
    } else if (code.toUpperCase().charAt(1) === 'E') {
      tempStress += 0.75;
    } else if (code.toUpperCase().charAt(1) === 'C' || code.toUpperCase().charAt(1) === 'M') {
      // console.log("starts wiht C ");
      tempStress += 0.50;
    }else {
      tempStress += 0.25;
    }
    // console.log("tempS: " + tempStress);
    setStress(stress + tempStress);
  
    return tempStress;
  }
  return (
    <div>
    <div class="popup" id="popupAdd">
      <div class="overlay"></div>
      <div class="content">
        <div class="inputPart">
          <p class="addTitle">Add a Class</p>
          <p class="lbl">Course Code:</p>
          <div class="lbl-info">please press enter once code is entered</div>
          <div class = "center">
            <div>
             <div style={{ marginTop: "1rem" }} class="ui search fluid">
             <div class="ui icon input">
               <input onKeyDown = {(ev)=> {
                 setFilteredClubs(empty);
                //  console.log(filteredClubs);
                 if (ev.key ==="Enter"){
                   
                     isSubmitted(true);
                  checkIfValid(ev.target.value);
                 }
               }}
                class = "popUpInputField" id = "sucks"  type = "text" placeholder = "Type to filter..">
                </input>
             </div>
             </div>
          </div>
          </div>
          <p class="lbl">Professor:</p>
          <div class = "center">
            <textarea
              class="popUpInputField"
              type="text"
              placeholder="Professor"
              id="professorInput"
              onChange = {getFilterText}
            />
           <div id="hideMe" class="onTop">{buildingList}</div>
        </div>
        </div>
        <div class="cancelSubmit">
          <button class="cancel" onClick={() => togglePopup(false)}>Cancel</button>
          <button class="submit" onClick={() => togglePopup(true)} >Submit</button>
        </div>
      </div>
      </div>
      <div class = "whatIfTitle">What If</div>
      <div class="semAverage">
        <div>Semester's Stress:</div>
        <div class="bold">{stress}</div>
      </div>
      <div onClick={() => togglePopup()} class="addClass">Add a Class</div>
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
          <div className="stressRate">{obj.stress}</div>
          <div className="controls">
            <div className="trash" onClick={() => handleTrash(obj.indx)}></div>
           
            <Link to={{
              pathname: '/CommentBoard',
           }} > <div className="goToComment"></div></Link>
         
              
          </div>
          </div>
        );
        })}
        </div>
  </div>
  );
};
export default WhatIf;
