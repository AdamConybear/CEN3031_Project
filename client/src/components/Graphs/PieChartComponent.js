import { Pie } from "react-chartjs-2";
import React, { Component } from "react";
import axios from "axios";
import "./PieChart.css"
// let sam = [];

function getdata() {
  let arr = [];

  let address;

  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // dev code
      address = "http://localhost:5000";
  } else {
      // production code
      address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
  }
  axios.get(address + '/api/popups').then((res) => {
    const r = res.data;
    
    console.log(r);
    let yes = 0;
    let no = 0;
    r.forEach((record) => {
      if (record.exercise) {
        yes++;
      } else {
        no++;
      }
    });
    arr.push(no);
    arr.push(yes);

    return arr;
  });
}

const pie = {
  labels: ["No", "Yes"],
  datasets: [
    {
      data: [7, 5],
      backgroundColor: ["orange", "blue"],
    },
  ],
};

class PieChartComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: pie,
    };

    // const legend = {
    //   display: true,
    //   position: "bottom",
    //   labels: {
    //     fontColor: "#323130",
    //     fontSize: 14,
    //   },
    // };
  }

  render() {
    return (
      <div>
        <div class="exTitle">Exercise</div>
        <Pie data={this.state.chartData} height="200%" />
        <br />
      </div>
    );
  }
}

export default PieChartComponent;
