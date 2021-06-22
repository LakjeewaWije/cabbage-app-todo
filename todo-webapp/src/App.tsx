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
import {Done as DoneIcon,LowPriority as LowPriorityIcon,Delete as DeleteIcon} from "@material-ui/icons";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import AddNewTodo from "./widgets/todo-form";
import {Button,Box,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper} from "@material-ui/core";
import moment from 'moment';
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
                    <TableCell style={{fontWeight:'bold'}} align="center" component="th" scope="row">
                      {row.title}
                    </TableCell>
                    <TableCell align="center">{row.state.toUpperCase()}</TableCell>
                    <TableCell align="center">
                      {moment(row.endDate).format("YYYY-MM-DD")}
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
         <AddNewTodo></AddNewTodo>
        </Box>
      </Box>
    </div>
  );
}

export default App;
