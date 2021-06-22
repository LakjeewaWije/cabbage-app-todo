import {
  Button,
  createStyles,
  makeStyles,
  TextField,
  Theme,
} from "@material-ui/core";
import React, { useState } from "react";
import { createTodo } from "../counterSlice";
import { useAppDispatch } from "../hook";
import TodoInterface from "../interfaces/todo.interface";
import moment from "moment";
import { useForm } from "./form";
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
    submitBtn: {
      margin: theme.spacing(1),
    },
  })
);

export default function AddNewTodo() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  // defining the initial state for the form
  const initialState = {
    title: "",
    state: "todo",
    endDate: moment().format("YYYY-MM-DD"),
  };

  // getting the event handlers from our custom hook
  const { onChange, onSubmit, setIntialState, values } = useForm(
    addTodoCallback,
    initialState
  );

  // a submit function that will execute upon form submission
  async function addTodoCallback() {
    // send "values" to database
    console.log("Submitted Form ", values, moment(values.endDate));
    dispatch(createTodo(values as TodoInterface));
    setIntialState(initialState);
  }

  return (
    <form
      className={classes.form}
      onSubmit={onSubmit}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          name="title"
          value={values.title}
          id="outlined-Title"
          label="Title"
          variant="outlined"
          onChange={onChange}
        />
      </div>
      <div>
        <TextField
          name="sate"
          id="outlined-State"
          label="Active State: Todo"
          disabled
          variant="outlined"
          onChange={onChange}
        />
      </div>
      <div>
        <TextField
          name="endDate"
          id="outlined-Date"
          label="End Date"
          variant="outlined"
          value={values.endDate}
          type="date"
          onChange={onChange}
        />
        <Button
          disabled={(/^\s/.test(values.title) || !values.title.trim().length) ? true: false}
          className={classes.submitBtn}
          type="submit"
          color="primary"
          variant="contained"
        >
          Add a Todo
        </Button>
      </div>
    </form>
  );
}

// export default AddNewTodo;
