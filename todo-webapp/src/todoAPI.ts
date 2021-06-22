// A mock function to mimic making an async request for data
import TodoInterface from "./interfaces/todo.interface";
const URL = "http://localhost:8000/api/todo";
export const getAllTodos = async (): Promise<TodoInterface[]> => {
  const res = await fetch(URL);
  const data = res.json();
  return data;
};

export const createATodo = async (arg:TodoInterface): Promise<TodoInterface> => {

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(arg),
  });
  const data = res.json();
  return data;
};

export const updateTodoState = async (arg:TodoInterface): Promise<TodoInterface> => {
  const res = await fetch(URL+`/${arg._id}/${arg.state}`, {
    method: "PATCH"
  });
  const data = res.json();
  return data;
};


export const deleteATodo = async (arg:TodoInterface): Promise<TodoInterface> => {
  const res = await fetch(URL+`/${arg._id}`, {
    method: "DELETE"
  });
  const data = res.json();
  return data;
};

export const sortATodo = async (arg:any): Promise<TodoInterface[]>  => {
  const res = await fetch(URL+`/filter/${arg.type}`);
  const data = res.json();
  return data;
};
