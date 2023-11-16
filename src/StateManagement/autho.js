import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authoisTrue: true,
};

export const adminLogin = createSlice({
  name: "adminLogin",
  initialState,
  reducers: {
    changeAutho: (state, action) => {
      state.authoisTrue = action.payload;
    },
  },
});

export const { changeAutho } = adminLogin.actions;
export default adminLogin.reducer;
