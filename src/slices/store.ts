import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import localStorageMiddleware from "../middleware.ts/localstorageMiddleware";
import { TodoReducer } from "./todoSlice";
import { UserReducer } from "./userSlice";

const store = configureStore({
  reducer: {
    todoSlice: TodoReducer,
    userSlice: UserReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
