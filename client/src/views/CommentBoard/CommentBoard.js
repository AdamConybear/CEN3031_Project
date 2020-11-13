import React, { Component } from "react";
//import Comment from "./Comment.js";
import "./CommentBoard.css";
import axios from "axios";
// import { makeStyles,withStyles } from '@material-ui/core/styles';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
const emoji = require("emoji-dictionary");

//const useStyles = theme =>({
//     table: {
//       minWidth: 650,
//     },
//   });
//const classes = useStyles();

class CommentBoard extends Component {
  state = {
    searchValue: "",
    searchisValid: false,
    isSubmitted: false,
    classArr: [],
    course: "",
    prof: "",
    comment: "",
  };

  handleSearchChange = (e) => {
    e.preventDefault();
    this.setState({ searchValue: e.target.value });
  };

  getCommentsFromDB = () => {
    console.log("getting comments for: " + this.state.searchValue);

    let address = process.env.ADDRESS || "http://localhost:5000/api/comment";

    axios
      .get(address, {
        params: {
          class: this.state.searchValue.toUpperCase(),
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ classArr: res.data });
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
    let address =
      process.env.ADDRESS || "http://localhost:5000/api/comment/like/";
    console.log(commentId);
    axios
      .put(address + commentId)
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
    let address =
      process.env.ADDRESS || "http://localhost:5000/api/comment/dislike/";
    console.log(commentId);
    axios
      .put(address + commentId)
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
    let address =
      process.env.ADDRESS || "http://localhost:5000/api/comment/flag/";
    console.log(commentId);
    axios
      .put(address + commentId)
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
  checkIfValid = () => {
    let val = false;
    let regex1 = "^[a-zA-Z]{3}[0-9]{4}$";
    let regex2 = "^[a-zA-Z]{3}[0-9]{4}[a-zA-Z]{1}$";
    if (
      this.state.searchValue.match(regex1) ||
      this.state.searchValue.match(regex2)
    ) {
      console.log("this is a good string");
      this.setState({ searchisValid: true });
      val = true;
    } else {
      console.log("this is a bad string");
      this.setState({ searchisValid: false });
    }
    return val;
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
    let address = process.env.ADDRESS || "http://localhost:5000/api/comment";
    axios
      .post(address, commentData)
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
          <div class="content">
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
                          <p class="stat">{comment.flags}</p>
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
        <a
          rel="noopener noreferrer"
          href={
            "https://www.reddit.com/r/ufl/search?q=" +
            this.state.searchValue +
            "&restrict_sr=1"
          }
          target="_blank"
        >
          <button>
            See what reddit says about {this.state.searchValue.toUpperCase()}!
          </button>
        </a>
      </div>
    );

    // // console.log(this.state.classArr);
    // return this.state.classArr.map(comment => {
    //     return(
    //         <Comment
    //             body={comment.comment}
    //             c = {comment.class}
    //             likes = {comment.likes}
    //             dislikes = {comment.dislikes}
    //             prof = {comment.professor}

    //             key = {comment}
    //         />

    //     );

    // });
  };

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
              //get comments for searchValue db
              if (val) {
                this.getCommentsFromDB();
              }
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
              {" "}
              {this.state.searchisValid
                ? "Showing Results for " + this.state.searchValue.toUpperCase()
                : "Invalid Course Code"}
            </div>
            {this.state.searchisValid ? this.displayComments() : null}
          </div>
        ) : null}
      </div>
    );
  }
}

export default CommentBoard;
// export default withStyles(useStyles)(testCommentBoard);
