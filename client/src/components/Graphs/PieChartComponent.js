import { Pie } from "react-chartjs-2";
import React, { useEffect, useState }  from "react";
import axios from "axios";
import { useAuth0 } from '@auth0/auth0-react';
import "./PieChart.css"
// let sam = [];

const PieChartComponent = () => {
  const [pieData, setPieData] = useState(null);
  const [isloaded, setIsLoaded] = useState(false);
  const { user } = useAuth0();
  const { sub } = user;


  useEffect(() => {

    let address;
    let isMounted = true;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }
    axios.get(address + '/api/user/popup',{
      params: {
        id: sub
    }})
    .then((res) => {
        let yes = 0;
        let no = 0;
        console.log(res.data);
        res.data.map((record) => {
          if(record.exercise === true) {
            yes++;
          } else{
            no++;
          }
        });
        console.log(yes);
        console.log(no);
        if (isMounted){
          setPieData({
            labels: ["Yes", "No"],
            datasets: [
              {
                data: [yes,no],
                backgroundColor: ["#F4E5D6", "#DDE2F4"],
              },
            ],
          });
          setIsLoaded(true);
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
      
    return () => { isMounted = false };
    },[]);

  return (
    <div>
      <div class="exTitle">Exercise</div>
      {isloaded ? 
        <Pie data={pieData}/> : null }
      <br />
    </div>
    );
}

export default PieChartComponent;
