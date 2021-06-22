import React from "react";
import { deleteTodo, selectTodos, updateTodo } from "../counterSlice";
import { useAppSelector, useAppDispatch } from "../hook";
import {Done as DoneIcon,LowPriority as LowPriorityIcon,Delete as DeleteIcon} from "@material-ui/icons";
import {Button,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Paper, makeStyles, createStyles, Theme} from "@material-ui/core";
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

export default function TodoTable() {
    const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();
  const classes = useStyles();
  return (
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
              <TableCell
                style={{ fontWeight: "bold" }}
                align="center"
                component="th"
                scope="row"
              >
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
                    row.state === "todo" ? <DoneIcon /> : <LowPriorityIcon />
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
  );
}
