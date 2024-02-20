import { createSlice } from "@reduxjs/toolkit";

export const roleSlice = createSlice({
  name: "roleSliceName",
  initialState: {
    roleStateRedux: false,
  },
  reducers: {

    changeRoleAuthorized: (state) => {

      // state.roleStateRedux = false;
      state.roleStateRedux = !state.roleStateRedux;
    },
  },
});

export const { changeRoleAuthorized } = roleSlice.actions;

