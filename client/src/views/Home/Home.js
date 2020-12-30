import React from "react";
import PopUp from "../../components/PopUp/PopUp";
import { useState, useEffect } from "react";
import TipPopUp from "../../components/Tips/TipPopUp";
import Graph from "../../components/Graphs/Graph";
import MonthGraph from "../../components/Graphs/MonthGraph";
import WeekGraph from "../../components/Graphs/WeekGraph";
import PieChartComponent from "../../components/Graphs/PieChartComponent";
import { Link } from "react-router-dom";
import { useAuth0 } from '@auth0/auth0-react';
import Quiz from "../../components/Quiz/Quiz";
import axios from "axios";

import "./Home.css";

const Home = () => {
  const [isOpen, setOpen] = useState(false);
  const [dbTip, setDbTip] = useState("");
  const [tipAuthor, setTipAuthor] = useState("");

  const [openQuiz, setOpenQuiz] = useState(false);

  const [week, setweek] = useState(false);
  const [month, setmonth] = useState(false);
  const [full, setfull] = useState(true);

  const { user } = useAuth0();
  const { sub, nickname } = user;

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

      const result = await axios.get(address + '/api/tip/random');
      setDbTip(result.data.tip);
      setTipAuthor(result.data.author);
      // setOpen(true);
      
    };
    fetchData();
  }, []);

  const handleWeek = (e) => {
    e.preventDefault();
    setweek(true);
    setfull(false);
    setmonth(false);
  }
  const getWeek = (e) => {
   console.log("get week");
   return <WeekGraph setweek = {setweek}/>
  }
  const handleMonth = (e) => {
    e.preventDefault();
    setmonth(true);
    setfull(false);
    setweek(false);
  }
  const getMonth = (e) => {
    return <MonthGraph setmonth = {setmonth}/>
  }
  const handleFull = (e) => {
    e.preventDefault();
    setfull(true);
    setmonth(false);
    setweek(false);
  }

  const getFull = (e) => {
    return <Graph setfull = {setfull}/>
  }

  const handleQuiz = (e) => {
    e.preventDefault();
    setOpenQuiz(true);
  }
  const getQuiz = (e) => {
    return <Quiz setOpenQuiz = {setOpenQuiz}/>;
  }


  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const getPop = (e) => {
    return <PopUp setOpen={setOpen} />;
  };



  /*<TipPopUp />
  <div>
    <button onClick={handleOpen}>Open Pop</button>
    {isOpen ? getPop() : null}
  </div>*/
  return (
    <div>
      <div class="graphsParent">
        {isOpen ? getPop() : null}
        {openQuiz? getQuiz() : null}
        <div className="test">
          <div class="welcomeParent">
            <div class="welcome">Welcome back, {nickname}</div>
            <div className = "row">
              <Link className = "boxOptionLeft" to="/Week">
                <div className = "weeklyPic"></div>
                <div className = "label">Weekly Schedule</div>
              </Link>
              <Link className = "boxOptionRight" to="/WhatIf">
                <div className = "whatIfPic"></div>
                <div className = "label">What - If</div>
              </Link>
            </div>
            <div className = "row">
              <Link className = "boxOptionLeft" to="/Resources">
                <div className = "resourcesPic"></div>
                <div className = "label">Resources</div>
              </Link>
              <Link className = "boxOptionRight" to="/CommentBoard">
                <div className = "commentPic"></div>
                <div className = "label">Comment Board</div>
              </Link>
            </div>
          </div>
          <div className="tipShower">
              <p className="tipHeader">A Tip For You</p>
              <p className="italic">"{dbTip}"</p>
              <p className="author">Suggested by: {tipAuthor}</p>
          </div>
        </div>

        <div class="sleepgraph">
            <div className="welcome">About You</div>
            <div className="size">
              {week? getWeek() : null}
              {month? getMonth() : null}
              {full? getFull() : null}
            </div>
            <div className="pieCenterer">
              <div class="pieParent"><PieChartComponent/></div>
              <div className="axisChanger">
                <p className="changeHeader">Change Graph Interval</p>
                <div className="optionButton" onClick={handleWeek} >Past Week</div>
                <div className="optionButton" onClick={handleMonth}>Past Month</div>
                <div className="optionButton" onClick={handleFull}>All Time</div>
              </div>
              <div className="yourRates">
                <div className="yourRate">Daily Popup</div>
                <div className="quiz-info">*complete once per day</div>
                <div className="refactor" onClick={handleOpen}>Popup</div>
                <div className="yourRate">Quiz</div>
                <div className="quiz-info">*update once a semester</div>
                <div className="refactor" onClick={handleQuiz}>Refactor</div>
              </div>
            </div>
        </div>


      </div>
    </div>
  );
};

export default Home;
