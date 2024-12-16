import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  diffToUTC: 0,
};

export const TimeSlice = createSlice({
  name: "time",
  initialState,
  reducers: {
    setDiffToUTC: (state, action) => {
      state.diffToUTC = action.payload;
    },
  },
});

export const { setDiffToUTC } = TimeSlice.actions;

export default TimeSlice.reducer;
