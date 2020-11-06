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
//import { Dropdown } from 'semantic-ui-react';
import "./CommentBoard.css";
//import 'semantic-ui-css/semantic.min.css';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
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

const rows = [
  createData(
    "I will try to cut Dr. Thomas some slack since this was her first time teaching this class and she was handed the same material every SWE professor taught before at UF. Cannot blame the curriculum on her, but she did make rookie errors with deadlines and tests. In the end, she wanted to hear feedback from students and continued to improve."
  ),
  createData(
    "The material is divided into in lectures on coding methodology and labs where you actually do software engineering and development. Her power points are basic and unengaging but the the bulk of your grade comes from the code assignments. She knows NOTHING about programing and comes off with an attitude. Prepare to work hard in lab."
  ),
  createData(
    "Dr. Thomas clearly cares about the class and she was always seeking feedback on how to improve the course. Like other people said, the organization of the course could definitely be better. The course is mostly based on a group project, so just hope you have decent group members and take some time to learn the tech stack."
  ),
  createData(
    "While this semester was a bit of a mess, I would definitely agree with another poster here that while Dr. Thomas seemed very enthusiastic about the course, the organization of the course was very strange. We were expected to learn the MERN stack on our own or through lectures by the TAs. I did not really learn anything from Dr. Thomas herself."
  ),
  createData(
    "She never actually did anything. Linked lectures from Prof Blanchard and Zhou. Blanchards were amazing. the whole course was out of order, which led to quizzes having content we hadnt learned yet. TAs were 4-6 weeks behind on grading. Luckily the lectures from Blanchard were linked and the material wasnt too hard, otherwise this would have sucked"
  ),
  createData(
    "Prof Thomas cares about this class. However, you can care and still be bad at something. Her lectures are useless because she just reads off the PowerPoint and shows awful YouTube videos that she has trouble playing. Lectures have almost nothing to do with the projects which are the vast majority of your grade. Not too hard but VERY time consuming."
  ),
  createData(
    "She doesnt actually teach the course. You watch old recordings of previous professors lectures. Very disorganized, slow responses, uncaring, and very vague on what is expected for projects and labs. Reviews before tests are 90% useless as well."
  ),
];

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

function CommentBoard() {
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const options = [
    {
      key: "thomas",
      text: "Dr. Sanethia Thomas",
      value: "Dr. Sanethia Thomas",
    },
    { key: "dobra", text: "Dr. Alin Dobra", value: "Dr. Alin Dobra" },
    { key: "dobbins", text: "Peter Dobbins", value: "Peter Dobbins" },
  ];
  return (
    <div>
      <div>
        <h1> Comment Board </h1>
      </div>
      <div text-align="center" class="ui action input">
        <input type="text" placeholder="Enter a course code..." />
        <button class="ui button">Search</button>
      </div>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableHead>
            <StyledTableRow>
              <StyledTableCell>Comments for CEN3031</StyledTableCell>
            </StyledTableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <StyledTableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
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
