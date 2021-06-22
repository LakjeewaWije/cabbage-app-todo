import React, {useEffect} from "react";
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
} from "./counterSlice";
import TodoInterface from "./interfaces/todo.interface";
function App() {
  const todos = useAppSelector(selectTodos);
  const dispatch = useAppDispatch();

  useEffect(()=>{
    dispatch(fetchAllTodos());
  },[]);

  return (
    <div className="App">
      <h1>TODO APP</h1>
      <div>
        {/* <span>{JSON.stringify(todos)}</span> */}
        <div>
          {todos.map((todo,index) => (
            <div key={index}>
              <span>{todo._id}</span>&nbsp;
              <span>{todo.title}</span> &nbsp;
              <span>{todo.state}</span> &nbsp;
              <span>{todo.endDate}</span> &nbsp;
              <button onClick={() => dispatch(updateTodo(todo.state === "todo" ? {_id:todo._id,state:"done"}: {_id:todo._id,state:"todo"}))} >{todo.state === "todo" ? `mark as done`:`mark as todo`}</button>&nbsp;
              <button onClick={() => dispatch(deleteTodo({_id:todo._id}))} >Delete</button>
            </div>
          ))}
        </div>
        {/* <button onClick={() => dispatch(fetchAllTodos())}>
          Gell all todos
        </button> */}

        <button onClick={() => dispatch(createTodo({title:"Cabbage-app-api",state:"todo",endDate: new Date()}))}>createTodo</button>
      </div>
    </div>
  );
}

export default App;
