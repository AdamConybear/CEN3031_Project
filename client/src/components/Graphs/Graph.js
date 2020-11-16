import React, { useEffect, setState, useState } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import { LineWeight } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";

const Graph = () => {
  let r = [[]];
  let arr = [];
  let arr2 = [];

  let title = [];

  const [popupArr, setpopupArr] = useState([[]]);

  const [address, setaddress] = useState(
    process.env.ADDRESS || "http://localhost:5000/api/popups"
  );

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
    axios.get(address).then((res) => {
      const r = res.data;
      //console.log("samanta");
      //console.log(r);

      let index = 1;
      r.forEach((record) => {
        title.push(index);
        arr.push(record.sleep);
        arr2.push(record.stress);
        index = index + 1;
      });

      //console.log(arr);
      //console.log(title);

      setpopupArr({
        Data: {
          labels: title,
          datasets: [
            {
              label: "sleep",
              fill: false,
              borderColor: "#742774",
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
              label: "stress",
              fill: false,
              backgroundColor: "#aad2ed",
              borderColor: "rgba(75,192,192,1)",
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
    <div
      style={{
        width: "450px",
        height: "450px",
      }}
    >
      <div>Sleep and Stress</div>
      <Line
        data={popupArr.Data}
        axes={axes}
        options={options}
        legend={legend}
      />
      <div>check in</div>
    </div>
  );
};
export default Graph;
