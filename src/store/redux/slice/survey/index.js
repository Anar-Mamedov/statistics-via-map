import surveySlice from "./surveySlice";

// Action creators are generated for each case reducer function
export const { add, remove } = surveySlice.actions;

const surveySliceReducer = surveySlice.reducer;
export default surveySliceReducer;
