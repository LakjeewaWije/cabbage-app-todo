import React, { useEffect } from "react";
import "./App.scss";
import { useAppDispatch } from "./hook";
import {
  fetchAllTodos
} from "./counterSlice";
import AddNewTodo from "./widgets/form/todo-form";
import {Box} from "@material-ui/core";
import SelectFilter from "./widgets/select";
import TodoTable from "./widgets/table";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAllTodos());
  }, [fetchAllTodos]);

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <span style={{fontWeight:'bold'}}>Sort :{" "}</span>
      <SelectFilter></SelectFilter>
      <Box
        display="flex"
        p={3}
        flexDirection="row"
        m={1}
        justifyContent="center"
        bgcolor="background.paper"
      >
        <Box>
          <TodoTable></TodoTable>
        </Box>
        <Box>
        <h3>Create new TODO</h3>
         <AddNewTodo></AddNewTodo>
        </Box>
      </Box>
    </div>
  );
}

export default App;
