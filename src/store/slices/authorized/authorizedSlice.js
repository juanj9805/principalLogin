import { createSlice } from "@reduxjs/toolkit";

export const authorizedSlice = createSlice({
  name: "authorized",
  initialState: {
    authorizedStateRedux: false,
  },
  reducers: {

    changeAuthorized: (state) => {

      state.authorizedStateRedux = !state.authorizedStateRedux;
    },
  },
});

export const { changeAuthorized } = authorizedSlice.actions;