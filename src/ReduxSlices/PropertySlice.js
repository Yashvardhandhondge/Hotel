import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentYield: null,
  yields: {},
};

export const YieldSlice = createSlice({
  name: "property",
  initialState,
  reducers: {
    setCurrentYield: (state, action) => {
      state.currentYield = action.payload;
    },
    updateYield: (state, action) => {
      let flag = false;
      if (state.yields[action.payload.token_id]) {
        const temp = {
          ...action.payload,
          metaData: state.yields[action.payload.token_id].metaData,
        };
        state.yields[action.payload.token_id] = temp;
        flag = true;
      }
      if (!flag) state.yields[action.payload.token_id] = action.payload;
    },
  },
});

export const { setCurrentYield, updateYield } = YieldSlice.actions;

export default YieldSlice.reducer;
