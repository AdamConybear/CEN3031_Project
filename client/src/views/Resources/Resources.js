import React, { Component } from "react";
import "./Resources.css";
import axios from "axios";
// import Table from "@material-ui/core/Table";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableContainer from "@material-ui/core/TableContainer";
// import TableRow from "@material-ui/core/TableRow";
// import Paper from "@material-ui/core/Paper";
import LeafletMap from "../../components/Maps/LeafletMap";
import { withAuth0 } from '@auth0/auth0-react';
import CheckIcon from '@material-ui/icons/Check';
import ClearIcon from '@material-ui/icons/Clear';
import "leaflet/dist/leaflet.css";
class Resources extends Component {
  state = {
    tip: "",
    tipArr: [],
    randomTip: "",
    isAdmin: false,
    tipsToReview: [],
    allTips: [],
    showPop:false,
    loading: true,
  };

  componentDidMount() {

    const { user } = this.props.auth0;
    const { sub } = user;
    let isMounted = true;
    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }

    axios.get(address + '/api/user/user',{
      params: {
        id: sub
    }})
      .then(res => {
        let user = res.data;
        console.log(user);
        if (user.role === "admin"){
          if (isMounted){
            this.setState({isAdmin: true});
          }
        }
      })

    axios.get(address + '/api/tip/accepted')
      .then(res => {
        // let tempArr = res.data;
        if (isMounted){
          this.setState({allTips: res.data});
        }
      })

    axios.get(address + '/api/tip/notAccepted')
    .then(res => {
      // let tempArr = res.data;
      // console.log("false tips");
      // console.log(res.data);
      if (isMounted){
        this.setState({tipsToReview: res.data});
        this.setState({loading: false});
      }

    })
    // this.setState({loading: false});
    return () => { isMounted = false };
  }



  // toggleTipForm = () => {
  //   this.setState({showPop: !this.state.showPop})
  // };

  togglePopup = () => {
    document.getElementById("popupR").classList.toggle("active");
    // this.setState({ course: this.state.searchValue });
  };


  acceptTip = (tipId) =>{
    // console.log("accipting tip");
    // console.log(tipId);
    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }
    //change status of accepted to true
    axios.put(address + '/api/tip/' + tipId)
    .then(res => {console.log(res.data)})
    .catch(error => {
      if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
      }
    });
  }

  denyTip = (tipId) => {
    console.log("deny tip");
    // console.log(tipId);
    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }
    //change status of accepted to true
    axios.delete(address + '/api/tip/' + tipId)
    .then(res => {console.log(res.data)})
    .catch(error => {
      if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
      }
    });
  }


  handleTipChange = (e) => {
    e.preventDefault();
    this.setState({ tip: e.target.value });
  };
  
  addTipToDB = () => {

    const { user } = this.props.auth0;
    const { nickname } = user;

    const tipData = {
      tip: this.state.tip,
      author: nickname,
      accepted: false
    };

    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }
    axios
      .post(address + "/api/tip", tipData)
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
      this.toggleTipForm();
      this.setState({tip: ""});
  };

  showPopup = () => {
    console.log("pop should show");

    return (
      <div class="popupR">
        <div class="overlayR"></div>
        <div class="contentR">
          <p>Suggested Wellness Tip</p>
          <textarea
            class="popUpInputTip"
            type="text"
            value={this.state.tip}
            id="tipInput"
            onChange={this.handleTipChange}
          />
          <div className="cancelSubmit">
            <button className="cancel" onClick={() => this.togglePopup()}>Cancel</button>
            <button className="submit"  onClick={this.addTipToDB}>Submit</button>
          </div>
        </div>
      </div>
    );

  }

  displayAllTips = () => {
    return this.state.allTips.map((tip) => {
      return (
        <div className="tipBox">
          {tip.tip}
        </div>
      );
    })
  }
  displayNonAcceptedTips = () => {
    return this.state.tipsToReview.map((tip) => {
      return (
        <div className="tipBox">
          <p style={{padding: "5px"}}>{tip.tip}</p>
          <div className = "tipIcons">
            <CheckIcon className="checkIcon" onClick={() => this.acceptTip(tip._id)} />
            <ClearIcon className="clearIcon" onClick={() => this.denyTip(tip._id)}/>
          </div>

        </div>
      );
    })
  }

  adminView = () => {
    return(
      <div className = "admin">
        
        <div class="popupR">
        <div class="overlayR"></div>
        <div class="contentR">
          <p>Suggested Wellness Tip</p>
          <textarea
            class="popUpInputTip"
            type="text"
            value={this.state.tip}
            id="tipInput"
            onChange={this.handleTipChange}
          />
          <div className="cancelSubmit">
            <button className="cancel" onClick={() => this.togglePopup()}>Cancel</button>
            <button className="submit"  onClick={this.addTipToDB}>Submit</button>
          </div>
        </div>
      </div>




        <div class="titleResources" style={{marginBottom:"20px"}}>Admin Resources</div>
        <div>
          <div className="tipButton" onClick={() => this.togglePopup()}>Add Tip</div>
        </div>
        <div className="tips">
          <div className = "admin-column">
            <div class="adminSuggest">Review Tips</div>
            {this.displayNonAcceptedTips()}
          </div>
          <div className = "admin-column">
            <div className = "adminSuggest">Accepted Tips</div>
            {this.displayAllTips()}
          </div>
        </div>
      </div>
    );
  } 

  userView = () => {

    return(
      <div>
        
        <div class="popupR" id="popupR">
        <div class="overlayR"></div>
        <div class="contentR">
          <p>Suggested Wellness Tip</p>
          <textarea
            class="popUpInputTip"
            type="text"
            value={this.state.tip}
            id="tipInput"
            onChange={this.handleTipChange}
          />
          <div className="cancelSubmit">
            <button className="cancel" onClick={() => this.togglePopup()}>Cancel</button>
            <button className="submit"  onClick={this.addTipToDB}>Submit</button>
          </div>
        </div>
      </div>


        <div className="titleResources">Resources</div>
        <p className="quote">“Anything that’s human is mentionable, and anything that is mentionable
        can be more manageable. When we can talk about our feelings, they become
        less overwhelming, less upsetting, and less scary.” – Fred Rogers</p>
        <div className="helperBar"></div>
        <div className="centerMap">
        <div className="legend">
          <div className="titleLegend">Legend</div>
          <div className="line">
            <div className="circle"></div><div className="subName">Seek Professional Help</div>
          </div>
          <div className="line">
            <div className="star"></div><div className="subName">Stay Active</div>
          </div>
          <div className="line">
            <div className="square"></div><div className="subName">Take a Break</div>
          </div>
          <div className="line">
            <div className="triangle"></div><div className="subName">Improve Eating Habits</div>
          </div>
        </div>
        <div id = "map" className="mapScalar">{<LeafletMap class="bringDown"/>}</div>
        <div className="legendSuggest">
          <div className="titleSuggest">Help Us Help Others</div>
          <div className="suggestButton">Suggest a New Place</div>
          <div className="suggestButton" onClick={() => this.togglePopup()}>Suggest a New Tip</div>
          <div className="suggestButton">Suggest a New Hotline</div>
          <p className="quoteSmaller">Your input is crucial for Gator Rater. By submitting recommendations you help Gator Rater grow and become a warmhearted community.</p>
        </div>
        </div>
        <div className="helperBarBottom"></div>
        <div className="hotlinesAndSites">
          <div className="hotlines">
            <div className="hotlineTitle">Hotlines</div>
            <div className="hotlineName">1. National Suicide Prevention Lifeline</div>
            <div className="phoneNumber">1-800-273-8255</div>
            <div className="phoneTime">24 / 7</div>

            <div className="hotlineName">2. National Alliance on Mental Illness</div>
            <div className="phoneNumber">1-800-950-6264</div>
            <div className="phoneTime">Monday through Friday, from 10 a.m. – 6 p.m.</div>

            <div className="hotlineName">3. Panic Disorder Information Hotline</div>
            <div className="phoneNumber">1-800-64-PANIC</div>
            <div className="phoneTime">24 / 7</div>

            <div className="hotlineName">4. General Crisis</div>
            <div className="phoneNumber">Text SUPPORT to 741-741</div>
            <div className="phoneTime">24 / 7</div>

            <div className="hotlineName">5. Eating Disorder Hotline</div>
            <div className="phoneNumber">1-800-931-2237</div>
            <div className="phoneTime">Monday through Thursday, from 9 a.m. – 9 p.m. and Friday from 9 a.m. – 5 p.m. (EST).</div>
          </div>
          <div className="sites">
            <div className="hotlineTitle">Websites</div>

            <div className="hotlineName">1. Mental Health</div>
            <div className="phoneNumber">www.mentalhealth.gov</div>
            <div className="phoneTime">24 / 7</div>

            <div className="hotlineName">2. Better Help</div>
            <div className="phoneNumber">www.betterhelp.com</div>
            <div className="phoneTime">24 / 7</div>

            <div className="hotlineName">3. MyCompass</div>
            <div className="phoneNumber">www.mycompass.org.au</div>
            <div className="phoneTime">24 / 7</div>

            <div className="hotlineName">4. This Way Up</div>
            <div className="phoneNumber">www.thiswayup.org.au</div>
            <div className="phoneTime">24 / 7</div>

            <div className="hotlineName">5. Centre for Clinical Interventions</div>
            <div className="phoneNumber">www.cci.health.wa.gov.au</div>
            <div className="phoneTime">24 / 7</div>
          </div>
        </div>
      </div>

    );

  }

  render() {
    return (
      <div>
        
        {this.state.loading ? null : this.state.isAdmin ? this.adminView(): this.userView()}
        {/* {<LeafletMap />} */}
      </div>
    );
  }
}

export default withAuth0(Resources);
