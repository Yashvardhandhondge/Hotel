import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenUpdate: null,
  messageToSend: null,
  receivedMessage: null,
};

export const CommunicationSlice = createSlice({
  name: "communication",
  initialState,
  reducers: {
    setTokenUpdate: (state, action) => {
      state.tokenUpdate = action.payload;
    },
    setMessageToSend: (state, action) => {
      state.messageToSend = action.payload;
    },
    setReceivedMessage: (state, action) => {
      state.receivedMessage = action.payload;
    },
  },
});

export const { setTokenUpdate, setMessageToSend, setReceivedMessage } =
  CommunicationSlice.actions;

export default CommunicationSlice.reducer;
