/* eslint-disable @typescript-eslint/no-explicit-any */
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addTodoToDB,
  deleteTodoFromDB,
  editTodoInDB,
  getTodosFromDB,
} from "../api/todo";

export interface Todo {
  id: string;
  title: string;
  description: string;
  date: Date;
  isDone: boolean;
  accountId: string;
}

interface TodoState {
  todos: Todo[];
  filteredTodos: Todo[];
  selectedTodo: Todo | null;
  error: string | null;
}

export const initialState: TodoState = {
  todos: [],
  filteredTodos: [],
  selectedTodo: null,
  error: null,
};

export const deleteTodoAsync = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("Todos/deleteTodo", async (TodoIdToDelete, thunkAPI) => {
  try {
    await deleteTodoFromDB(TodoIdToDelete);
    return TodoIdToDelete;
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addTodoAsync = createAsyncThunk<
  Todo,
  Todo,
  { rejectValue: string }
>("Todos/addTodo", async (todo, thunkAPI) => {
  try {
    const createdTodo = await addTodoToDB(todo);
    if (createdTodo) {
      return createdTodo;
    } else {
      return thunkAPI.rejectWithValue("failed to create Todo");
    }
  } catch (error) {
    throw new Error("Något gick fel vid .");
  }
});

export const editTodoAsync = createAsyncThunk<
  Todo,
  Todo,
  { rejectValue: string }
>("Todos/editTodo", async (todo, thunkAPI) => {
  try {
    const editedTodo = await editTodoInDB(todo);
    if (editedTodo) {
      return editedTodo;
    } else {
      return thunkAPI.rejectWithValue("failed to edit Todo");
    }
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

const TodoSlice = createSlice({
  name: "Todo",
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    findTodoById: (state, action: PayloadAction<{ TodoId: string }>) => {
      const { TodoId } = action.payload;
      const foundTodo = state.todos.find((todo) => todo.id === TodoId);
      if (foundTodo) {
        state.selectedTodo = foundTodo;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.todos.push(action.payload);
          state.error = null;
        }
      })
      .addCase(addTodoAsync.rejected, (state) => {
        state.error =
          "Något gick fel när sysslan skapades. Försök igen senare.";
      })
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        if (action.payload) {
          const editedTodoIndex = state.todos.findIndex(
            (todo) => todo.id === action.payload.id
          );
          if (action.payload.id) {
            state.todos[editedTodoIndex] = action.payload as Todo;
            state.error = null;
          }
        }
      })
      .addCase(editTodoAsync.rejected, (state) => {
        state.error =
          "Något gick fel vid redigering av sysslan. Försök igen senare.";
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.todos = state.todos.filter(
            (todo) => todo.id !== action.payload
          );
        }
      });
  },
});

export const { findTodoById } = TodoSlice.actions;

export const fetchTodos =
  (activeAccountId: string) => async (dispatch: any) => {
    const todos = await getTodosFromDB(activeAccountId);
    dispatch(TodoSlice.actions.setTodos(todos));
  };

export const TodoReducer = TodoSlice.reducer;
export type { TodoState };
