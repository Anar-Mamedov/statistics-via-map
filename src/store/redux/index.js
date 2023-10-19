import { configureStore } from "@reduxjs/toolkit";
import surveySliceReducer from "./slice/survey";

const store = configureStore({
  reducer: {
    surveys: surveySliceReducer,
  },
});

export default store;
