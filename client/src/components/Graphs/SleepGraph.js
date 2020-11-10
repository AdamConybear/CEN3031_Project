import React from "react";
import { Chart } from "react-charts";

const SleepGraph = () => {
  const data = React.useMemo(
    () => [
      {
        label: "Series 1",
        data: [],
      },
      {
        label: "Series 2",
        data: [
          [0, 3],
          [1, 1],
          [2, 5],
          [3, 6],
          [4, 4],
        ],
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
