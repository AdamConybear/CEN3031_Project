import React from "react";
import PropTypes from "prop-types";
import { makeStyles, useTheme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";
import "./CommentBoard.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.common.black,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.common.white,
    },
  },
}))(TableRow);

const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));

function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };
  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };
  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };
  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === "rtl" ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};

function createData(name) {
  return { name };
}

// This is where I actually started coding

// Variable that lets the table know how many rows to create
var incrementer = 0;

//Comment class
class Comment {
  constructor(course, professor, comment, thumbsUp, thumbsDown) {
    this.course = course;
    this.professor = professor;
    this.comment = comment;
    this.thumbsUp = thumbsUp;
    this.thumbsDown = thumbsDown;
  }
}

//Creating dummy data
let comment1 = new Comment(
  "CEN3031",
  "Sanethia Thomas",
  "I will try to cut Dr. Thomas some slack since this was her first time teaching this class and she was handed the same material every SWE professor taught before at UF. Cannot blame the curriculum on her, but she did make rookie errors with deadlines and tests. In the end, she wanted to hear feedback from students and continued to improve",
  "3",
  "20"
);
let comment2 = new Comment(
  "CEN3031",
  "Sanethia Thomas",
  "The material is divided into in lectures on coding methodology and labs where you actually do software engineering and development. Her power points are basic and unengaging but the the bulk of your grade comes from the code assignments. She knows NOTHING about programing and comes off with an attitude. Prepare to work hard in lab.",
  "50",
  "2"
);
let comment3 = new Comment(
  "MATH2000",
  "Math Porfessor",
  "I hate math",
  "5",
  "2"
);
let comment4 = new Comment(
  "ENG1020",
  "English Prof",
  "Love english",
  "540",
  "32"
);
let comment5 = new Comment(
  "HIS2222",
  "History Prof",
  "Love history",
  "50",
  "2"
);
let comment6 = new Comment("WTV2020", "Dr Whatever", "Whatever", "50", "2");
let comment7 = new Comment(
  "IMP2030",
  "Impossible Course",
  "So impossible",
  "5",
  "22"
);
let comment8 = new Comment(
  "JOU1220",
  "Mr. Journalist",
  "Journalist Reporting",
  "5220",
  "0"
);
let comment9 = new Comment("SPO1111", "Messi", "Love sports", "52220", "22");
let comment10 = new Comment("TEC2023", "Tech Guy", "So tech", "10", "2");
var commentDB = [
  comment1,
  comment2,
  comment3,
  comment4,
  comment5,
  comment6,
  comment7,
  comment8,
  comment9,
  comment10,
];

//Rows displayed where comments will be
const rows = [];

//Formality
const useStyles2 = makeStyles({ table: { minWidth: 500 } });

function CommentBoard() {
  // From lines 143-157 it's the table's default stuff
  const classes = useStyles2();

  const [page, setPage] = React.useState(0);

  const [rowsPerPage, setRowsPerPage] = React.useState(incrementer);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Populating the table rows. If course code on search bar == database comment's course code -> display on table
  for (var i = 0; i < commentDB.length; i++) {
    if (commentDB[i].course.toUpperCase() == window.name.toUpperCase()) {
      rows.push(createData(commentDB[i].comment));
      incrementer++;
    }
  }

  function handleChange(e) {
    this.setState({ value: e.target.value });
  }

  //Variable displayed on the table's title such as -> "Showing Results for " + this variable
  var titleDisplay = "";

  //Changing the titleDisplay if there's no input or to the actual input
  if (window.name == "") {
    titleDisplay = "No Course Code Provided";
  } else {
    titleDisplay = "Showing Results for " + window.name.toUpperCase();
  }

  //Show or hide popup
  function togglePopup() {
    document.getElementById("popup-1").classList.toggle("active");
  }

  //Refreshes the page for table to show new data
  function refreshPage() {
    window.location.reload();
  }

  //Adds to database
  function addToDB() {
    var course = document.getElementById("courseInput").value;
    var professor = document.getElementById("professorInput").value;
    var comment = document.getElementById("commentInput").value;

    // Adding new comment to fake DB
    let commentX = new Comment(course, professor, comment, "3", "20");
    commentDB.push(commentX);

    refreshPage();
  }

  return (
    <div>
      <div>
        <h1 class="commentBoard">Comment Board</h1>
      </div>
      <input
        onKeyDown={(ev) => {
          console.log(`Pressed keyCode ${ev.key}`);
          if (ev.key === "Enter") {
            window.name = ev.target.value;
            ev.preventDefault();
            refreshPage();
            var tabla = document.getElementById("tabla");
            tabla.remove();
          }
        }}
        name="searchBox"
        type="text"
        id="searchBox"
        class="no-outline"
        placeholder="Enter a Course Code"
      />

      <div class="popup" id="popup-1">
        <div class="overlay"></div>
        <div class="content">
          <div class="inputPart">
            <p class="addTitle">Add a Comment</p>
            <p class="lbl">Course Code:</p>
            <textarea
              class="popUpInputClass"
              type="text"
              placeholder="Course Code"
              id="courseInput"
            />
            <p class="lbl">Professor:</p>
            <textarea
              class="popUpInputProf"
              type="text"
              placeholder="Professor"
              id="professorInput"
            />
            <p class="lbl">Comment:</p>
            <textarea
              class="popUpInput"
              type="text"
              placeholder="Write your Comment"
              id="commentInput"
            />
          </div>
          <div class="cancelSubmit">
            <button class="cancel" onClick={() => togglePopup()}>
              Cancel
            </button>
            <button class="submit" onClick={() => addToDB()}>
              Submit
            </button>
          </div>
        </div>
      </div>

      <div class="addCommentParent">
        <button class="addComment" onClick={() => togglePopup()}>
          +
        </button>
      </div>

      <TableContainer class="tableContainer" component={Paper}>
        <Table
          id="tabla"
          class="commentTable"
          className={classes.table}
          aria-label="custom pagination table"
        >
          <div class="titleParent">
            <div class="center">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell class="title" fontSize="20">
                    {titleDisplay}
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
            </div>
            <div class="filterOptions">
              <TableHead>
                <StyledTableRow>
                  <StyledTableCell class="filterBy" fontSize="10">
                    {"Filter By Professor:"}
                  </StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <button class="option">Sanethia Thomas</button>
              <button class="option">Jackson Jefferson</button>
              <button class="option">Jeremiah Blanchard</button>
            </div>
          </div>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.name}>
                <TableCell class="tableCell" component="th" scope="row">
                  {row.name}
                  <div class="superReaction">
                    <div class="reactionGroup">
                      <p class="reactionStats">13</p>
                      <button class="reaction">👍</button>
                      <p class="reactionStats">2</p>
                      <button class="reaction">👎</button>
                      <button class="reaction">🚩</button>
                    </div>
                  </div>
                </TableCell>
              </StyledTableRow>
            ))}

            {emptyRows > 0 && (
              <StyledTableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={1} />
              </StyledTableRow>
            )}
          </TableBody>
          <TableFooter>
            <StyledTableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                colSpan={1}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                SelectProps={{
                  inputProps: { "aria-label": "rows per page" },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </StyledTableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CommentBoard;
