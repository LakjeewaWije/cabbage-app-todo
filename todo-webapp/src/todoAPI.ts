// A mock function to mimic making an async request for data
import TodoInterface from "./interfaces/todo.interface";
const URL = "http://localhost:8000/api/todo";
export const getAllTodos = async (): Promise<TodoInterface[]> => {
  const res = await fetch(URL);
  const data = res.json();
  return data;
};

export const createATodo = async (): Promise<TodoInterface> => {

  const res = await fetch(URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      "title": "create api 911",
      "state": "inprogress",
      "endDate": new Date()
  }),
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
