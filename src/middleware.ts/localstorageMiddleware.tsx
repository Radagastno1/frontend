// src/middleware/localStorageMiddleware.ts
import { Middleware } from "@reduxjs/toolkit";
import { RootState } from "../slices/store";

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action);

  const state: RootState = store.getState();

  if (state.userSlice.activeUser) {
    localStorage.setItem(
      "activeUser",
      JSON.stringify(state.userSlice.activeUser)
    );
  } else {
    localStorage.removeItem("activeUser");
  }

  if (state.todoSlice.todos) {
    localStorage.setItem("todos", JSON.stringify(state.todoSlice.todos));
  } else {
    localStorage.removeItem("todos");
  }

  return result;
};

export default localStorageMiddleware;
