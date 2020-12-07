import React, { Component } from "react";
import "./Resources.css";
import axios from 'axios';

// // Initialize leaflet.js
// var L = require("leaflet");

// // Initialize the map
// var map = L.map("map", {
//   scrollWheelZoom: false,
// });

// // Set the position and zoom level of the map
// map.setView([47.7, 13.35], 7);

// // Initialize the base layer
// var osm_mapnik = L.tileLayer(
//   "http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
//   {
//     maxZoom: 19,
//     attribution:
//       '&copy; OSM Mapnik <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
//   }
// ).addTo(map);
class Resources extends Component {
  state = {
    tip: "",
    tipArr: []
  };

  togglePopup = () => {
    document.getElementById("popup-1").classList.toggle("active");
    // this.setState({ course: this.state.searchValue });
  };

  handleTipChange = (e) => {
    e.preventDefault();
    this.setState({ tip: e.target.value });
  };

  addTipToDB = () => {
    const tipData = {
      tip: this.state.tip,
      accepted: false,
      reviewed:false
    };
    let address = process.env.ADDRESS || "http://localhost:5000/api/tip";
    axios
      .post(address, tipData)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  getAcceptedFromDB = () => {
    console.log("getting tips");

    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }

    axios
      .get(address + '/api/tip/accepted')
      .then((res) => {
        console.log(res.data);
        this.setState({ tipArr: res.data });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  displayUtilities = () => {
    return (
      <div>
        <div class="addCommentParent">
          <div class="addComment" onClick={() => this.togglePopup()}>
            +
          </div>
        </div>
        <div class="popup" id="popup-1">
          <div class="overlay"></div>
          <div class="content">
            <div class="inputPart">
              <p class="addTitle">Suggest a wellness tip!</p>
              <p>
                Thank you for contributing. Your tip will be sent for review
                before it's added!
              </p>
              <textarea
                class="popUpInputClass"
                type="text"
                //placeholder="Enter your tip here."
                value={this.state.tip}
                id="tipInput"
                onChange={this.handleTipChange}
              />
            </div>
            <div class="cancelSubmit">
              <button class="cancel" onClick={() => this.togglePopup()}>
                Cancel
              </button>
              <button
                class="submit"
                onClick={() => {
                  // Add the tip to the DB
                  this.addTipToDB();
                  this.togglePopup();
                  console.log(this.state.tip);
                  this.setState({ tip: "" });
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.displayUtilities();
  }
}

export default Resources;
