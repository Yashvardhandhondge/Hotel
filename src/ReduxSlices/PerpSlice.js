import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  crypto: {},
  realestate: {},
};

export const PerpsSlice = createSlice({
  name: "perps",
  initialState,
  reducers: {
    updatePerpsData: (state, action) => {
      const keys = action.payload.path.split(".");
      state[keys[0]][keys[1]] = action.payload.data;
    },
  },
});

export const { updatePerpsData } = PerpsSlice.actions;

export default PerpsSlice.reducer;
