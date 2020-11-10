import React from "react";
import { Chart } from "react-charts";

const StressGraph = () => {
  const data = React.useMemo(
    () => [
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
      <div>Stress</div>
      <Chart data={data} axes={axes} />
      <div>days</div>
    </div>
  );
};
export default StressGraph;
