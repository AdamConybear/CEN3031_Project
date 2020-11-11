import React from "react";
import { Chart } from "react-charts";
import axios from 'axios';

const SleepGraph = () => {
  const popupArray = [[]];
  
  const getData = () => {
    let address = process.env.ADDRESS || 'http://localhost:5000/api/popups';
        axios.get(address)
        .then(res => {
            console.log(res.data);
        })
        .catch(error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
                console.log(error.response.headers);
            }
        });
  }
  getData();
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [],
      },
      {
        label: "Series 2",
        data: popupArray,
      },
    ],
    []
  );
  

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
    <div
      style={{
        width: "500px",
        height: "400px",
      }}
    >
      <div>Sleep</div>
      <Chart data={data} axes={axes} />
      <div>hours</div>
    </div>
  );
};
export default SleepGraph;
