import TodoInterface from "../interfaces/todo.interface";
import { Schema, model } from "mongoose";
const TodoSchema = new Schema<TodoInterface>(
    {
      title: { type: String, required: true },
      status: { type: String, required: true },
      endDate: { type: Date, required: true },
    },
  );
  
  export const TodoDao = model<TodoInterface>("todos", TodoSchema);