import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const surveySlice = createSlice({
  name: "surveys",
  initialState,
  reducers: {
    remove: () => {},
    add: () => {},
  },
});

export default surveySlice;
