import React, { Component } from "react";
import { useState, setState } from "react";
import {useEffect} from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import "./Graph.css";
import { useAuth0 } from '@auth0/auth0-react';

const MonthGraph = () => {
  let arr = [];
  let arr2 = [];

  let title = [];

  const [popupArr, setpopupArr] = useState([[]]);
  const [isloaded, setIsLoaded] = useState(false);
  const { user } = useAuth0();
  const { sub } = user;


  const legend = {
    display: true,
    position: "bottom",
    labels: {
      fontColor: "#323130",
      fontSize: 14,
    },
  };
  const options = {
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "",
          },
          ticks: {
            suggestedMin: 0,
            suggestedMax: 10,
          },
        },
      ],
    },
  };

  useEffect(() => {

    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }

    axios.get(address + '/api/user/popup', {
      params: {
        id: sub,
      }}).then((res) => {
      const r = res.data;
      //console.log("samanta");
      console.log(r);


      const size = r.length; 
      let start;
      if (size < 30){
        start = 0;
      }else{
        start = size-30; 
      }
      // console.log(start);

      // let index = 1;
      for (var i = start; i < size; i++){
        // title.push(index);

        arr.push(r[i].sleep);
        arr2.push(r[i].stress);
        // index= index+1; 
      }
      for (var i = 1; i <= 30; i++){
        title.push(i);

      }

  

      setpopupArr({
        Data: {
          labels: title,
          datasets: [
            {
              label: "Sleep",
              fill: false,
              borderColor: "blue",
              data: arr,
              backgroundColor: [
                "#3cb371",
                "#0000FF",
                "#9966FF",
                "#4C4CFF",
                "#00FFFF",
                "#f990a7",
                "#aad2ed",
                "#FF00FF",
                "#FF00FF",
                "#FF00FF",
                "Blue",
                "Blue",
                "Blue",
                "Blue",
                "Blue",
                "Red",
              ],
            },
            {
              label: "Stress",
              fill: false,
              backgroundColor: "#aad2ed",
              borderColor: "orange",
              data: arr2,
              backgroundColor: [
                "#3cb371",
                "#0000FF",
                "#9966FF",
                "#4C4CFF",
                "#00FFFF",
                "#f990a7",
                "#aad2ed",
                "#FF00FF",
                "#FF00FF",
                "#FF00FF",
                "Blue",
                "Blue",
                "Blue",
                "Blue",
                "Blue",
                "Red",
              ],
            },
          ],
        },
      });
      setIsLoaded(true);
    });
  }, []);

  const axes = React.useMemo(
    () => [
      { primary: true, type: "linear", position: "bottom" },
      { type: "linear", position: "left" },
    ],
    []
  );

  return (
    // A react-chart hyper-responsively and continuously fills the available
    // space of its parent element automatically
    <div class="box">
      <div class="ssTitle">Sleep and Wellness</div>
      {isloaded ? 
      <Line
        class="size"
        data={popupArr.Data}
        axes={axes}
        options={options}
        legend={legend}
      /> : null}
    </div>
  );
};
export default MonthGraph;