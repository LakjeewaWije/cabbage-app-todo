import React, { useEffect, useState } from "react";
import "./App.scss";
import { useAppSelector, useAppDispatch } from "./hook";
import {
  decrement,
  increment,
  incrementByAmount,
  selectTodos,
  fetchAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
  sortTodo,
} from "./counterSlice";
import TodoInterface from "./interfaces/todo.interface";
import { Button } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import LowPriorityIcon from "@material-ui/icons/LowPriority";
import DoneIcon from "@material-ui/icons/Done";
import Box from "@material-ui/core/Box";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
//   tableHeader: {
//     backgroundColor: "#1f2336",
//   },
//   tableHeadings: {
//     color: "#fff",
//   },
//   form: {
//     '& > *': {
//       margin: spacing(1),
//       width: '25ch',
//     },
//   },
// });

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 650,
    },
    tableHeader: {
      backgroundColor: "#1f2336",
    },
    tableHeadings: {
      color: "#fff",
    },
    form: {
      "& > *": {
        margin: theme.spacing(1),
        width: "25ch",
      },
    },
  })
);

function App() {
  const classes = useStyles();
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  const [sortValue, setSortValue] = useState("");

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, []);

  return (
    <div className="App">
      <h1>TODO APP</h1>
      Sort :{" "}
      <select
        defaultValue={1}
        onChange={(event) => {
          console.log("Slelcting ", event.target.value);
          dispatch(sortTodo({ type: event.target.value }));
        }}
      >
        <option value="asc">End date ascending</option>
        <option value="desc">End date desc</option>
        <option value={1}>Old to new</option>
        <option value={-1}>New to old</option>
      </select>
      <Box
        display="flex"
        p={3}
        flexDirection="row"
        m={1}
        justifyContent="center"
        bgcolor="background.paper"
      >
        <Box>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead className={classes.tableHeader}>
                <TableRow>
                  <TableCell className={classes.tableHeadings}>Title</TableCell>
                  <TableCell className={classes.tableHeadings} align="center">
                    State
                  </TableCell>
                  <TableCell className={classes.tableHeadings} align="center">
                    End Date
                  </TableCell>
                  <TableCell className={classes.tableHeadings} align="center">
                    Active State Change
                  </TableCell>
                  <TableCell className={classes.tableHeadings} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {todos.map((row) => (
                  <TableRow key={row._id}>
                    <TableCell align="center" component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="center">{row.state}</TableCell>
                    <TableCell align="center">
                      {new Date(row.endDate).toString()}
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="primary"
                        variant="contained"
                        startIcon={
                          row.state === "todo" ? (
                            <DoneIcon />
                          ) : (
                            <LowPriorityIcon />
                          )
                        }
                        onClick={() =>
                          dispatch(
                            updateTodo(
                              row.state === "todo"
                                ? { _id: row._id, state: "done" }
                                : { _id: row._id, state: "todo" }
                            )
                          )
                        }
                      >
                        {row.state === "todo" ? `mark as done` : `mark as todo`}
                      </Button>
                    </TableCell>
                    <TableCell align="center">
                      <Button
                        color="secondary"
                        variant="contained"
                        startIcon={<DeleteIcon />}
                        onClick={() => dispatch(deleteTodo({ _id: row._id }))}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box>
          <form className={classes.form} noValidate autoComplete="off">
            <div>
              <TextField id="outlined-basic" label="Title" variant="outlined" />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="Sate:Todo"
                disabled
                variant="outlined"
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                label="End Date"
                variant="outlined"
                defaultValue={"2021-06-19"}
                type="date"
              />
            </div>
          </form>
          <Button
            color="primary"
            variant="contained"
            onClick={() =>
              dispatch(
                createTodo({
                  title: "Cabbage-app-api",
                  state: "todo",
                  endDate: new Date(),
                })
              )
            }
          >
            Add a Todo
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default App;
