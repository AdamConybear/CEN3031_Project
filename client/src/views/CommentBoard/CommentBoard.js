import React, { Component } from "react";
//import Comment from "./Comment.js";
import "./CommentBoard.css";
import axios from "axios";
// import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
// import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { CollectionsOutlined } from "@material-ui/icons";
import { withAuth0 } from '@auth0/auth0-react';
const emoji = require("emoji-dictionary");


class CommentBoard extends Component {
  


  state = {
    disp: false,
    searchValue: "",
    searchisValid: false,
    selected: false,
    isSubmitted: false,
    classArr: [],
    tempy: [],
    teacherArr: [],
    course: "",
    prof: "",
    comment: "",
    isAdmin:false,
 
  };

  componentDidMount(){
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
    return () => { isMounted = false };
  }


  handleSearchChange = (e) => {
    e.preventDefault();
    this.setState({ searchValue: e.target.value });
  };

  getCommentsFromDB = () => {
    console.log("getting comments for: " + this.state.searchValue);

    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }

    axios
      .get(address + '/api/comment', {
        params: {
          class: this.state.searchValue.toUpperCase(),
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({tempy: res.data});
        this.setState({ classArr: res.data });
        console.log(this.state.classArr);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        }
      });
  };
  updateLike = (commentId) => {


    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }
    console.log(commentId);
    axios
      .put(address + '/api/comment/like/' + commentId)
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
  updateDislike = (commentId) => {

    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }

    console.log(commentId);
    axios
      .put(address + '/api/comment/dislike/' + commentId)
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
  updateFlags = (commentId) => {

    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }

    console.log(commentId);
    axios
      .put(address + '/api/comment/flag/', commentId)
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

  getProfessors = (props) => {
    var profs = new Set();
  var teacherArray = [];
   const size = props.length;
   for (var i = 0; i < size; i ++){
    var teachers = props[i]["sections"][0]["instructors"].length;
    for (var j = 0; j < teachers; j++){
          profs.add(props[i]["sections"][0]["instructors"][j]["name"])
    }
   }
   profs.forEach(v => teacherArray.push(v));
   console.log(teacherArray);

   this.setState({ teacherArr: teacherArray });
   console.log(this.state.teacherArr);

  }



  checkAPI = (props) => {
    var proxyUrl = "https://cors-anywhere.herokuapp.com/";
    console.log(props);
    const base = 'https://one.ufl.edu/apix/soc/schedule/?category=CWSP&course-code='
    const mid = props;
    const end = '&term=2208/allow-cors';
    const url = proxyUrl + base + mid + end;
    axios.get(url, {mode:'cors'}).then((value) => {
      console.log(value);
        if (value["data"][0]["COURSES"].length != 0){

          console.log("exists");
          this.getProfessors(value["data"][0]["COURSES"]);
          this.setState({isSubmitted: true });
          this.getCommentsFromDB();
       //   return true;
        }
        else {

          console.log("not a class");
          this.setState({isSubmitted: true });
          this.setState({searchisValid: false})
          return false;
         // return false;

        }
    }).catch((err)=> {
    console.log(err);
    });
  }


  checkIfValid = () => {
 
    let regex1 = "^[a-zA-Z]{3}[0-9]{4}$";
    let regex2 = "^[a-zA-Z]{3}[0-9]{4}[a-zA-Z]{1}$";
    if (
      this.state.searchValue.match(regex1) ||
      this.state.searchValue.match(regex2)
    ) {
      console.log("this is a good string");
      this.setState({ searchisValid: true });
     return this.checkAPI(this.state.searchValue);

    }
     else {
      console.log("this is a bad string");
      this.setState({ searchisValid: false });
      return false; 
    }
    
  };

  togglePopup = () => {
    document.getElementById("popup-1").classList.toggle("active");
    this.setState({ course: this.state.searchValue });
  };

  addCommentToDB = () => {
    const commentData = {
      comment: this.state.comment,
      class: this.state.course.toUpperCase(),
      professor: this.state.prof,
      likes: 0,
      dislikes: 0,
      flags: 0,
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
      .post(address + '/api/comment', commentData)
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

  handleCourseChange = (e) => {
    e.preventDefault();
    this.setState({ course: e.target.value });
  };
  handleProfChange = (e) => {
    e.preventDefault();
    this.setState({ prof: e.target.value });
  };
  handleCommentChange = (e) => {
    e.preventDefault();
    this.setState({ comment: e.target.value });
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
          <div class="contentP">
            <div class="inputPart">
              <p class="addTitle">Add a Comment</p>
              <p class="lbl">Course Code:</p>
              <textarea
                class="popUpInputClass"
                type="text"
                // placeholder="Course Code"
                value={this.state.course.toUpperCase()}
                id="courseInput"
                onChange={this.handleCourseChange}
              />
              <p class="lbl">Professor:</p>
              <textarea
                class="popUpInputProf"
                type="text"
                placeholder="Professor"
                id="professorInput"
                onChange={this.handleProfChange}
              />
              <p class="lbl">Comment:</p>
              <textarea
                class="popUpInput"
                type="text"
                placeholder="Write your Comment"
                id="commentInput"
                onChange={this.handleCommentChange}
              />
            </div>
            <div class="cancelSubmit">
              <button class="cancel" onClick={() => this.togglePopup()}>
                Cancel
              </button>
              <button
                class="submit"
                onClick={() => {
                  this.togglePopup();
                  this.addCommentToDB();
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

  deleteComment = (commentId) => {
    let address;

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        // dev code
        address = "http://localhost:5000";
    } else {
        // production code
        address = process.env.BASE_URL || "https://lit-anchorage-94851.herokuapp.com";
    }
    axios
      .delete(address + '/api/comment',{
        params: {
          id: commentId
      }})
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


  }




  displayComments = () => {
    return (
      <div>
        <TableContainer class="tableContainer" component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {this.state.classArr.map((comment) => {
                return (
                  <TableRow class="expand" key={comment.comment}>
                    <TableCell colSpan={1} component="th" scope="row">
                      <div class="courseAndProf">
                        {comment.class + " / "}
                        {comment.professor}
                      </div>
                      <div class="maxWidth">{comment.comment}</div>
                      <div class="reactionParent">
                        
                        {this.state.isAdmin ? <div class="admin-delete" onClick={() => this.deleteComment(comment._id)}>delete</div> : null}
                        
                        <div class="statAndEmoji">
                          <p class="stat">{comment.likes}</p>
                          <button
                            class="reaction"
                            onClick={() => {
                              this.updateLike(comment._id);
                            }}
                          >
                            {emoji.getUnicode("+1")}
                          </button>
                        </div>
                        <div class="statAndEmoji">
                          <p class="stat">{comment.dislikes}</p>
                          <button
                            class="reaction"
                            onClick={() => {
                              this.updateDislike(comment._id);
                            }}
                          >
                            {emoji.getUnicode("-1")}
                          </button>
                        </div>
                        <div class="statAndEmoji">
                          {/* <p class="stat">{comment.flags}</p> */}
                          <button
                            class="reaction"
                            onClick={() => {
                              this.updateFlags(comment._id);
                            }}
                          >
                            {emoji.getUnicode("triangular_flag_on_post")}
                          </button>
                        </div>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <div className="redditParent">
          <a
            className="reddit"
            rel="noopener noreferrer"
            href={
              "https://www.reddit.com/r/ufl/search?q=" +
              this.state.searchValue +
              "&restrict_sr=1"
            }
            target="_blank"
          >
            {this.state.searchValue.toUpperCase()} on Reddit
          </a>
        </div>
      </div>
    );

  };





  setProf = (obj) => {

    console.log("proffessor that was clicked is ", obj);

    console.log(this.state.classArr);

    this.setState({selected: true});
    var temparr = [];
   
    this.state.tempy.forEach(comment => {
    //  console.log(comment["professor"]);
     // console.log(this.state.prof);
      
      if (comment["professor"].localeCompare(obj)== 0){
      //  console.log("same");
         temparr.push(comment);
      }
    })

    console.log("new arr");
    console.log(temparr);
    this.setState({classArr: temparr});
   this.displayComments();
   //this.setState({classArr:this.state.tempy});

  }

  render() {
    return (
      <div>
        <div>
          <h1 class="commentBoard">Comment Board</h1>
        </div>
        <input
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              this.setState({ isSubmitted: true });
              const val = this.checkIfValid();
              
            }
          }}
          type="text"
          class="searchBox"
          onChange={this.handleSearchChange}
          placeholder="Enter a Course Code"
        />
        {this.state.isSubmitted ? (
          <div className="valid">
            {this.state.searchisValid ? (
              this.displayUtilities()
            ) : (
              <div class="spaceOut"></div>
            )}
            <div class="showingResults">
              {this.state.searchisValid ? "Showing Results for " + this.state.searchValue.toUpperCase() : "Invalid Course Code"}
                 <div class = "profsContainer">
                 <div className="filterTitle">Filter By Professor:  </div>
                  {this.state.teacherArr.map((obj)=> {
                      return (            
                        <div className="profBox" onClick={() => this.setProf(obj)}>
                          {obj}
                        </div>
                      );
                  })}
                </div>
            </div>
            {this.state.searchisValid ? this.displayComments() : null}
           
          </div>
        ) : null}
      </div>
    );
  }
}

export default withAuth0(CommentBoard);
