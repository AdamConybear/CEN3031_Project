import React, { useRef, useState } from "react";
import ICAL from "ical.js";
import moment from "moment";
// import styled from "styled-components";
import Assignment from "./Assignment";
// import Button from "@material-ui/core/Button";
import "./week.css";
import "./Upload.css";

let classMap = new Map();
let weekArr = [];
for (let i = 0; i < 7; i++) {
  weekArr.push(moment().add(i, "days").format("dddd"));
}

const startOfWeek = moment().add(0, "days").format();
const endOfWeek = moment().add(6, "days").format();

const Upload = () => {
  let fileReader;
  const hiddenFileInput = useRef(null);

  const [showAssingments, setShowAssingments] = useState(false);
  const [overallStress, setOverallStress] = useState(0);

  const parseEvent = (e) => {
    //passed in a single vevent
    //event being returned needs to have the summary's title, dtend's date
    //check if location contains the word zoom, in that case dont add
    let event = {};
    // let location=[]; //will act like a stack

    for (let i = 0; i < e[1].length; i++) {
      let prop = e[1][i];
      // console.log("prop: " + prop);
      if (prop[0] === "location" && prop[3].includes("Zoom")) {
        // if it has a location that means it's on zoom and I don't want it
        return -1;
      }
      if (prop[0] === "dtend") {
        let date = moment(prop[3]).format();
        if (date >= startOfWeek && date <= endOfWeek) {
          event[prop[0]] = prop[3];
        } else {
          // console.log("end of week is: " + endOfWeek);
          // console.log("assignment date is: " + date);
          return -1;
        }
      }
      if (prop[0] === "summary") {
        event[prop[0]] = prop[3];
      }
    }
    // console.log(event);
    return event;
  };

  const handleFileRead = (e) => {
    const content = fileReader.result;
    //parse the content with ical.js

    let fileData = ICAL.parse(content);
    let events = fileData[2]; // the 2 index contains all the vevents
    let result = []; //will contain all the event objects that I will then need to sort

    let brackets = [];
    // let classMap = new Map();

    events.forEach((e) => result.push(parseEvent(e)));
    // console.log("result of parse: " + result);
    const len = Object.keys(result).length;

    //creates a map with key = class name and value = array of all assignments in class
    for (let i = 0; i < len; i++) {
      let summary = result[i].summary;
      let dateEnd = result[i].dtend;
      let sumLen;
      let className = "";

      if (result[i] !== -1) {
        //not on zoom

        for (let j = 0; j < summary.length - 1; j++) {
          //star
          if (brackets.includes("[")) {
            className += summary.charAt(j);
          }
          if (summary.charAt(j) === "[") {
            brackets.push("[");
            sumLen = j - 1;
          }
        }
        brackets.pop();
        let parsedSum = summary.substr(0, sumLen); //removes the className
        let assignmentArr = [parsedSum, dateEnd];

        if (!classMap.has(className)) {
          classMap.set(className, [assignmentArr]);
          // numClasses++;
        } else {
          let arr = classMap.get(className);
          arr.push(assignmentArr);
          classMap.set(className, arr);
        }
      }
    }
    console.log(classMap);
    // console.log(classMap.size);
    console.log("moment week: " + weekArr);
    setShowAssingments(true);
    calculateStress();
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
    //e.preventDefault();
    //  setShowAssingments(true);
  };

  // const handleSubmit = (e) => {
  //     e.preventDefault();
  //     setShowAssingments(true);
  // }

  const getDayAssignments = (day) => {
    let assignments = [];
    let classArr = [];
    // let assignments = [];
    for (const [key, value] of classMap.entries()) {
      let className;
      const regex = "^[a-zA-Z]{3}[0-9]{4}$"; //EX: CEN3031
      //just gets course code and number
      if (!key.match(regex)) {
        className = key.substring(0, 7);
      } else {
        className = key;
      }
      for (let i = 0; i < value.length; i++) {
        let text = value[i][0]; //assignment
        let date = moment(value[i][1]).format("dddd"); //date of assignment
        if (date === day) {
          //if assingment belongs to the specfic day passed in
          //will be one of assignments displayed
          assignments.push(text);
          classArr.push(className);
        }
      }
    }
    return {
      classes: classArr,
      assignments: assignments,
    };
  };

  const displayWeek = (day) => {
    let arr = getDayAssignments(day);
    let cArr = arr.classes;
    let aArr = arr.assignments;
    // console.log(arr.classes);
    // console.log(arr.assignments);

    //setting overall stress
    // aArr.map(assignment => {
    //   let index = aArr.indexOf(assignment);
    //   let numAssignments = aArr.length;
    //   let c = cArr[index];
    //   let assingmentStress = calculateStress(assignment, numAssignments, c);
    //   setOverallStress(overallStress + assingmentStress);

    // })

    return aArr.map((assignment) => {
      let index = aArr.indexOf(assignment);
      // let numAssignments = aArr.length;
      let c = cArr[index];

      return <Assignment assignment={assignment} c={c} key={assignment} />;
    });
  };

  const calculateStress = () => {
    //I have access to classMap
    console.log(classMap);
    let stress = 0;
    let mult; //multiplier for course code

    for (const [key, value] of classMap.entries()) {
      let className = key;
      //stress by class Type
      if (className.charAt(3) === "4") {
        console.log("4000 lvl class");
        stress += 1;
        mult = 1;
      } else if (className.charAt(3) === "3") {
        stress += 0.75;
        mult = 0.5;
      } else {
        stress += 0.25;
        mult = 0.25;
      }

      for (let i = 0; i < value.length; i++) {
        let assignment = value[i][0]; //assignment

        //stress by assignment type
        if (assignment.toUpperCase().includes("EXAM")) {
          stress += 2 * mult;
        } else if (assignment.toUpperCase().includes("QUIZ")) {
          stress += 1 * mult;
        } else if (assignment.toUpperCase().includes("PROJECT")) {
          console.log("project");
          stress += 1.75 * mult;
        } else {
          stress += 0.5 * mult;
        }
        // let date = moment(value[i][1]).format('dddd'); //date of assignment

        //each assignment adds stress
        stress += 0.10;
      }
    }
    var round = stress.toFixed(1);
    // return stress;
    setOverallStress(round);
  };

  return (
    <div>
      <div class="weeksAverage">
        <div>Week's Stress:</div>
        <div class="bold">{overallStress}</div>
      </div>

      <div class="fileInputParent">
        <label for="file" class="custom-file-upload">
          Upload an iCal File
        </label>
        <input
          type="file"
          id="file"
          accept=".ics"
          ref={hiddenFileInput}
          onChange={(e) => handleFileChosen(e.target.files[0])}
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "0px;",
        }}
      >
        {weekArr.map((day) => {
          return (
            <div>
              <div class="dayColumn">
                <div class="day">{day}</div>
                <div class="assignment">
                  {showAssingments ? displayWeek(day) : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Upload;
