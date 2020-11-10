import React, { useState } from "react";
import styled from "styled-components";
// import './Home.css';
import Button from "@material-ui/core/Button";
import "./week.css";
// mport styled from "styled-components";
import Icon from "@material-ui/core/Icon";
// import Textarea from "react-textarea-autosize";
import Card from "@material-ui/core/Card";

// import styles from './week.css'
import "./week.css";

const Outline = styled.div`
  height: 100px;
  width: 150px;

  background: #f9f9f9;
  //   padding: 10px;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  box-shadow: 0 2px 4px black;
  position: relative;
  transition: transform 0.2s; /* Animation */
  font-size: 12px;
  //   &:hover{
  //     transform: scale(1.05)
  //   }
`;

const Assignment = ({ assignment, c }) => {
  // const [rateForm, setRateForm] = useState(false);

  const toggleRateForm = () => {
    console.log("you clicked rate");
    document.getElementById("popup-1").classList.toggle("active");
  };

  return (
    <div>
      <div className="popup" id="popup-1">
        <div className="overlay"></div>
        <div className="content">
          <div className="inputPart">
            <p className="addTitle">Rate Assignment</p>
            <p className="lbl">Course Code:</p>
            <textarea
              className="popUpInputClass"
              type="text"
              placeholder="Course Code"
              id="courseInput"
            />
            <p className="lbl">Professor:</p>
            <textarea
              className="popUpInputProf"
              type="text"
              placeholder="Professor"
              id="professorInput"
            />
            <p className="lbl">Comment:</p>
            <textarea
              className="popUpInput"
              type="text"
              placeholder="Write your Comment"
              id="commentInput"
            />
          </div>
          <div className="cancelSubmit">
            <button className="cancel" onClick={() => toggleRateForm()}>
              Cancel
            </button>
            <button className="submit">Submit</button>
          </div>
        </div>
      </div>

      <Outline>
        <div
          style={{ marginBottom: "5px", fontWeight: "bold", fontSize: "12px" }}
        >
          {c}
        </div>
        <div style={{ marginBottom: "5px" }}>{assignment}</div>
        <Button
          size="small"
          variant="contained"
          style={{
            fontSize: 11,
            cursor: "pointer",
            width: "50px",
            height: "20px",
          }}
          onClick={() => toggleRateForm()}
        >
          Rate
        </Button>
        {/* <RateButton>Rate</RateButton> */}
        {/* {rateForm ? ratePopup(): null} */}
      </Outline>
    </div>
  );
};

export default Assignment;
