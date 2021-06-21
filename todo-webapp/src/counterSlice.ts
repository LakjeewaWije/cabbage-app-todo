import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'
import TodoInterface from './interfaces/todo.interface';
import { createATodo, getAllTodos } from './todoAPI';

// Define a type for the slice state
interface todoState {
  todos: TodoInterface []
}

// Define the initial state using that type
const initialState: todoState = {
    todos: []
}

export const fetchAllTodos = createAsyncThunk(
    'todo/fetchTodos',
    async () => {
      const response = await getAllTodos();
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  );

  export const createTodo = createAsyncThunk(
    'todo/createTodo',
    async () => {
      const response = await createATodo();
      // The value we return becomes the `fulfilled` action payload
      return response;
    }
  );
  

export const todoSlice = createSlice({
  name: 'todo',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    increment: state => {
      state.todos = state.todos
    },
    decrement: state => {
        state.todos = state.todos
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
        state.todos = state.todos
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllTodos.pending, (state) => {
      })
      .addCase(fetchAllTodos.fulfilled, (state, action) => {
        state.todos = action.payload;
      });

      builder
      .addCase(createTodo.pending, (state) => {
      })
      .addCase(createTodo.fulfilled, (state, action) => {
        state.todos.push(action.payload);
      });
  },
})

export const { increment, decrement, incrementByAmount } = todoSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectTodos = (state: RootState) => state.todo.todos

export default todoSlice.reducer