import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  period: {
    start: null,
    end: null,
  },
  guests: 1,
  fee: 0,
  who: { adults: 1 },
};

export const ReservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    setReservationPeriod: (state, action) => {
      state.period = action.payload;
    },
    setReservationGuests: (state, action) => {
      state.guests = action.payload;
    },
    setReservationFee: (state, action) => {
      state.fee = action.payload;
    },
    setWho: (state, action) => {
      state.who = action.payload;
      let temp = 0;
      let keys = Object.keys(state.who);
      for (let i = 0; i < keys.length; i++) {
        if (keys[i] === "adults" || keys[i] === "children")
          temp += state.who[keys[i]];
      }
      state.guests = temp;
    },
  },
});

export const {
  setReservationGuests,
  setWho,
  setReservationPeriod,
  setReservationFee,
} = ReservationSlice.actions;

export default ReservationSlice.reducer;
