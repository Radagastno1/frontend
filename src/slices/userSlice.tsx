// src/slices/userSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { saveUserToFirestore } from "../api/user";

export interface User {
  accountId: string;
  name: string;
  email: string;
  picture: string;
}

interface UserState {
  activeUser: User | undefined;
  error: string | null;
}

export const initialState: UserState = {
  activeUser: undefined,
  error: null,
};

const loadUserFromLocalStorage = (): User | undefined => {
  const userData = localStorage.getItem("activeUser");
  return userData ? JSON.parse(userData) : undefined;
};

export const addUserAsync = createAsyncThunk<
  User,
  User,
  { rejectValue: string }
>("User/addUser", async (user, thunkAPI) => {
  try {
    const createdUser = await saveUserToFirestore(user);
    if (createdUser) {
      return createdUser;
    } else {
      return thunkAPI.rejectWithValue("failed to create user");
    }
  } catch (error) {
    throw new Error("Något gick fel vid skapande/updatering av användaren.");
  }
});

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    loadUser: (state) => {
      const user = loadUserFromLocalStorage();
      if (user) {
        state.activeUser = user;
      }
    },
    clearUser: (state) => {
      state.activeUser = undefined;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUserAsync.fulfilled, (state, action) => {
        if (action.payload) {
          state.activeUser = action.payload;
          state.error = null;
        }
      })
      .addCase(addUserAsync.rejected, (state) => {
        state.error =
          "Något gick fel när användaren skapades. Försök igen senare.";
      });
  },
});

export const UserReducer = UserSlice.reducer;
export type { UserState };
export const { loadUser, clearUser } = UserSlice.actions;
