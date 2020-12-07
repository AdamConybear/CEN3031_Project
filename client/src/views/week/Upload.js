import React, { useEffect, useRef, useState } from "react";
import ICAL from "ical.js";
import moment from "moment";
import Assignment from "./Assignment";
import "./week.css";
import "./Upload.css";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';

let classMap = new Map();

let weekArr = [];
for (let i = 0; i < 7; i++) {
  weekArr.push(moment().add(i, "days").format());
}
const startOfWeek = moment().add(0, "days").format();
const endOfWeek = moment().add(6, "days").format();

const Upload = () => {
  let fileReader;
  const hiddenFileInput = useRef(null);  
  const [assArr, setAssArr] = useState([]);
  const { user } = useAuth0();
  const { sub } = user;

  useEffect(() => {
    const fetchData = async () => {

      let address;

      if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          // dev code
          address = "http://localhost:5000";
      } else {
          // production code
          address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
      }

      const result = await axios.get(address + '/api/user/assignment',{
        params: {
          id: sub
      }});
      console.log(result.data);//will give me an array of assignment objects
      let displayArr = [];
      result.data.map((a) => {
        if (moment(a.dueDate).isSame(startOfWeek, 'day') || moment(a.dueDate).isAfter(startOfWeek, 'day')){
          displayArr.push(a);
        }
        // moment(a.dueDate).isBefore(startOfWeek, 'day')

      })
      setAssArr(displayArr);
    
    };
    // calculateStress();
    fetchData();
  }, []);



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
        // console.log(date);
        if((moment(date).isSame(startOfWeek, 'day') || moment(date).isAfter(startOfWeek, 'day')) && (moment(date).isSame(endOfWeek, 'day') || moment(date).isBefore(endOfWeek, 'day'))){
          event[prop[0]] = prop[3];
        }else{
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
    // console.log("moment week: " + weekArr);
    // setShowAssingments(true);

    //they have uploaded their own file
    addAssignmentsToDb();
    // calculateStress();
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
    //e.preventDefault();
    //  setShowAssingments(true);
  };

  // const getDayAssignments = (day) => {

  //   let assignments = [];
  //   let classArr = [];
  //   // let assignments = [];
  //   for (const [key, value] of classMap.entries()) {
  //     let className;
  //     const regex = "^[a-zA-Z]{3}[0-9]{4}$"; //EX: CEN3031
  //     //just gets course code and number
  //     if (!key.match(regex)) {
  //       className = key.substring(0, 7);
  //     } else {
  //       className = key;
  //     }
  //     for (let i = 0; i < value.length; i++) {
  //       let text = value[i][0]; //assignment
  //       let date = moment(value[i][1]).format("dddd"); //date of assignment
  //       if (date === day) {
  //         //if assingment belongs to the specfic day passed in
  //         //will be one of assignments displayed
  //         assignments.push(text);
  //         classArr.push(className);
  //       }
  //     }
  //   }
  //   return {
  //     classes: classArr,
  //     assignments: assignments,
  //   };
  // };

  //adding assingments to db
  
  const addAssignmentsToDb = () => {
    //use class map 
    let address;
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }

    let displayArr = [];
    for (const [key, value] of classMap.entries()) {
      for (let i = 0; i < value.length; i++) {
        let text = value[i][0]; //assignment
        let date = moment(value[i][1]).format(); //date of assignment

        let newAssignment = {
          assignment: text,
          class: key,
          dueDate: date,
          hours: 0,
          difficulty: 0,
          isRated: false
        };
        // console.log(containsObject(newAssignment,assArr));

        if (!containsObject(newAssignment,assArr)){ //assignment being added is not in db
          displayArr.push(newAssignment);
        
          axios.post(address + '/api/user/assignment', newAssignment, {
            params: {
              id: sub
            }}).then((res) => {
              console.log(res.data); //entire assignment arr
              // displayArr.push(res.data);
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
              }
            }); 
        }
      }
    }
    // console.log(displayArr);
    setAssArr(assArr.concat(displayArr));
  };

  const containsObject = (obj, list) => {
    for (let i = 0; i < list.length; i++) {
        if (list[i].assignment === obj.assignment) {
            return true;
        }
    }

    return false;
}


  const calculateStress = () => {
    //I have access to classMap
    // console.log(classMap);
    let stress = 0;
    let mult; //multiplier for course code


    for (let i = 0; i < assArr.length; i++){
      let className = assArr[i].class;
      let assignment = assArr[i].assignment;

      //course level
      if (className.charAt(3) === "4") {
        stress += 1;
        mult = 1;
      } else if (className.charAt(3) === "3") {
        stress += 0.75;
        mult = 0.5;
      } else {
        stress += 0.25;
        mult = 0.25;
      }
      //assignment type
      if (assignment.toUpperCase().includes("EXAM")) {
        stress += 2 * mult;
      } else if (assignment.toUpperCase().includes("QUIZ")) {
        stress += 1 * mult;
      } else if (assignment.toUpperCase().includes("PROJECT")) {
        stress += 1.75 * mult;
      } else {
        stress += 0.5 * mult;
      }

      //per assignment
      stress += 0.10;

    }


    // for (const [key, value] of classMap.entries()) {
    //   let className = key;
    //   //stress by class Type
    //   if (className.charAt(3) === "4") {
    //     console.log("4000 lvl class");
    //     stress += 1;
    //     mult = 1;
    //   } else if (className.charAt(3) === "3") {
    //     stress += 0.75;
    //     mult = 0.5;
    //   } else {
    //     stress += 0.25;
    //     mult = 0.25;
    //   }

    //   for (let i = 0; i < value.length; i++) {
    //     let assignment = value[i][0]; //assignment

    //     //stress by assignment type
    //     if (assignment.toUpperCase().includes("EXAM")) {
    //       stress += 2 * mult;
    //     } else if (assignment.toUpperCase().includes("QUIZ")) {
    //       stress += 1 * mult;
    //     } else if (assignment.toUpperCase().includes("PROJECT")) {
    //       stress += 1.75 * mult;
    //     } else {
    //       stress += 0.5 * mult;
    //     }
    //     // let date = moment(value[i][1]).format('dddd'); //date of assignment

    //     //each assignment adds stress
    //     stress += 0.10;
    //   }
    // }

    var round = stress.toFixed(1);
    return round;
    // setOverallStress(round);
  };


  const displayAssignmentOnDay = (day) => {
    return assArr.map((a) => {
      if (moment(a.dueDate).isSame(day, 'day')){
        return <Assignment assignment={a.assignment} c={a.class} key={a.assignment} />;
      }
    })
  }

  return (
    <div>
      <div class="weeksAverage">
        <div>Week's Stress:</div>
        <div class="bold">{calculateStress()}</div>
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
                <div class="day">{moment(day).format("dddd")}</div>
                <div class="assignment">
                  {displayAssignmentOnDay(day)}
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
