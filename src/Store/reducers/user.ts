import { User } from "@/Services";
import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    user: {
      id: 0,
      lName: "",
      fName: "",
      email: "",
      phone: "",
      createdAt: "",
      updatedAt: "",
    },
    isLoading: false,
    error: null,
  },
  reducers: {
    changeUser: (state, action) => {
      state.user = action.payload;
    },
    setDefaultUser: (state, { payload: { user } }) => {
      state.user = user;
    },
  },
});

export const { changeUser, setDefaultUser } = slice.actions;
export const userReducers = slice.reducer;