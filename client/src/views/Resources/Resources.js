import React, { Component } from "react";
import "./Resources.css";
import axios from "axios";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import LeafletMap from "../../components/Maps/LeafletMap";
import "leaflet/dist/leaflet.css";
class Resources extends Component {
  state = {
    tip: "",
    tipArr: [],
    randomTip: "",
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
      reviewed: false,
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

    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      // dev code
      address = "http://localhost:5000";
    } else {
      // production code
      address =
        process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }

    axios
      .get(address + "/api/tip/accepted")
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
  getRandomTip = () => {
    console.log("getting random tip");

    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
      // dev code
      address = "http://localhost:5000";
    } else {
      // production code
      address =
        process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }

    axios
      .get(address + "/api/tip/random")
      .then((res) => {
        console.log(res.data);
        this.setState({ randomTip: res.data[0].tip });
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };

  displayAddTip = () => {
    return (
      <div>
        <div class="addCommentParent" onClick={() => this.displayTips()}>
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


  displayTips = () => {
    return (
      <div>
        <TableContainer class="tableContainer" component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {this.state.tipArr.map((tip) => {
                return (
                  <TableRow class="expand" key={tip.tip}>
                    <TableCell colSpan={1} component="th" scope="row">
                      <div>{tip.tip}</div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    );
  };
  displayRandomTip = () => {
    return (
      <div>
        {this.state.randomTip}
      </div>
    );
  };

  render() {
    return (
      <div>
        <button onClick={() => this.getAcceptedFromDB()}>refresh tips</button>
        <button onClick={() => this.getRandomTip()}>Random tip</button>
        {this.displayTips()}
        {this.displayAddTip()}
        {this.displayRandomTip()}
        {<LeafletMap />}
      </div>
    );
  }
}

export default Resources;
