// surveySlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const surveySlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: () => {},
  },
});

export const { add, remove } = surveySlice.actions;
export default surveySlice;
