import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    userId: null,
  },
  reducers: {
    login: (state, action) => {
      state.userId = action.payload;
    },
    logout: (state, action) => {
      state.userId = null;
    },
  },
});

export const { login, logout } = slice.actions;
export default slice.reducer;
