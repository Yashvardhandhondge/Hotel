import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  eventToEmit: null,
};

export const NotificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addItem: (state, action) => {
      if (action.payload.type === "event") {
        let newArray = [];
        for (let i = 0; i < state.items.length; i++) {
          if (
            state.items[i].data?.token_id === action.payload.data?.token_id &&
            state.items[i].data?.sender === action.payload.data?.sender
          ) {
          } else {
            newArray.push(state.items[i]);
          }
        }
        state.items = newArray;
      }
      if (action.payload.type === "message") {
        let newArray = [];
        for (let i = 0; i < state.items.length; i++) {
          if (state.items[i].data?.id !== action.payload.data?.id) {
            newArray.push(state.items[i]);
          }
        }
        state.items = newArray;
      }
      state.items.push(action.payload);
    },
    removeItem: (state, action) => {
      state.items.splice(action.payload, 1);
    },
    removeTxByHash: (state, action) => {
      for (let i = 0; i < state.items.length; i++) {
        if (
          state.items[i].type === "event" &&
          state.items[i].data.txHash === action.payload
        )
          state.items.splice(i, 1);
      }
    },
    setEventToEmit: (state, action) => {
      state.eventToEmit = action.payload;
    },
  },
});

export const { addItem, removeItem, setEventToEmit, removeTxByHash } =
  NotificationSlice.actions;

export default NotificationSlice.reducer;
