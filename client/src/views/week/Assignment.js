import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import posed from "react-pose";
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

// import styles from './week.css'
import "./week.css";


const ShakePose = posed.div({
  shake: {
    applyAtEnd: { y: 0 },
    applyAtStart: { y: -10 },
    y: 0,
    transition: {
      type: "spring",
      stiffness: 1000,
      damping: 10,
      duration: 4
    }
  }
});

const hours = ['<1', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10+'];
const difficulty = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

const Assignment = ({ assignment, c }) => {
  const [hwColor, setHwColor] = useState("#f9f9f9");
  const [hour, setHour] = useState('1');
  const [diff, setDiff] = useState('4');
  const [showPop,setShowPop] = useState(false);
  const [timeDB, setTimeDB] = useState(0);
  const [diffDB, setDiffDB] = useState(0);
  const [hasRated, setHasRated] = useState(false);

  // const [ass,setAss] = useState();
  // const [popup, setPopup] = useState(false);
  const { user } = useAuth0();
  const { sub } = user;

  const toggleRateForm = () => {
    console.log("toggling rate");
    setShowPop(!showPop);
    // console.log(event.target.value);
    // setAss(document.getElementById(a));
  };

//   const toggleRateForm2 = () => {
//     setShowPop(false);
//    // document.getElementById("popup-1").classList.toggle("active");
//  };

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

      const result = await axios.get(address + '/api/user/allAssignments',{
        params: {
          assignment: assignment
      }});

      const userResult = await axios.get(address + '/api/user/indivAssignment',{
        params: {
          id: sub,
          assignment: assignment
      }});
      setHasRated(userResult.data.isRated);
      // console.log(result.data);//will give me an array of objects, each object is a differnt assignmet with same title
      
      //assignment exists in db
      if (result.data.length > 0){
        let tempDiff = 0;
        let tempHours = 0;
        let len = result.data.length;

        result.data.map(a => {
          tempDiff += a.difficulty;
          tempHours += a.hours;
        })
        let roundDiff = tempDiff/len;
        let roundHours = tempHours/len;
        setTimeDB(roundDiff.toFixed(1));
        setDiffDB(roundHours.toFixed(1)); 

      }
    };

    fetchData();
  }, []);



  const assignmentDone = () =>{
    console.log("completed");
    if (hwColor === "#f9f9f9"){
      setHwColor("#bbeebb");
    }else{
      setHwColor("#f9f9f9");
    }

  }

  const handleHourChange = (e) => {
    setHour(e.target.value);
  }
  const handleDiffChange = (e) => {
    setDiff(e.target.value);
  }

  const handleSubmit = () => {

    const ratedAssingment = {
      hours: hour,
      difficulty: diff,
      isRated: true
    }


    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }

    axios.put(address + '/api/user/assignmentRated', ratedAssingment,{
      params: {
        id: sub,
        assignment: assignment
    }})
    .then(setHasRated(true))
    .catch(error => {
      if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
      }
    });

    setShowPop(false);
    // setHasRated(true);
  }

  const showPopup = () => {
    console.log("pop should show");

    return (
      <div className="popupbby">
        <div className="overlay"></div>
        <div className="content" style={{width: '380px', height: '350px'}}>
          <div>
            <p>Rate {assignment}</p>
            <div>
              <TextField
                id="standard-select-currency"
                select
                label="Approx Hours"
                value={hour}
                onChange={handleHourChange}
                helperText="Number of hours to complete assignment"
                style={{marginBottom:'30px'}}
              >
                {hours.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="standard-select-currency"
                select
                label="Difficulty"
                value={diff}
                onChange={handleDiffChange}
                helperText="Difficulty of assingment from 1-10 (10 being hard)"
              >
                {difficulty.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="cancelSubmit">
                <button className="cancel" onClick={toggleRateForm}>
                  Cancel
                </button>
                <button className="submit" style={{marginLeft: '225px'}} onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
    </div>
    );

  }

  return (
    <div>
      {showPop ? showPopup():null}
      <ShakePose pose={["shake"]} poseKey={hwColor}>
        <div class="assignmentBox" style={{backgroundColor:hwColor}} onDoubleClick={assignmentDone}>
          <div class="sideClassDisplay">{c}</div>
          <div class="middleContent">
            <div class="assignmentNameOnBox">{assignment}</div>
            <div class="timeAndDifficulty">Time: {timeDB}</div>
            <div class="timeAndDifficulty">Difficulty: {diffDB}</div>
            {!hasRated ? 
            <Button class="rateButtonOnBox" variant="contained"
              onClick={toggleRateForm}>
              Rate
            </Button> : null}
          </div>
          <div class="sideClassDisplay">{c}</div>
        </div>
      </ShakePose>
    </div>
  );
};

export default Assignment;
