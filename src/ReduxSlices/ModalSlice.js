import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  transactionModal: false,
  txStatus: null,
  connectModal: false,
};

export const ModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    setTxPending: (state) => {
      state.transactionModal = true;
      state.txStatus = null;
    },
    setTxConfirmed: (state) => {
      state.transactionModal = true;
      state.txStatus = true;
    },
    setTxFailed: (state) => {
      state.transactionModal = true;
      state.txStatus = false;
    },
    setTxModalClose: (state) => {
      state.transactionModal = false;
      // state.txStatus = null;
    },
    setConnectModal: (state, action) => {
      state.connectModal = action.payload;
    },
  },
});

export const {
  setTxPending,
  setTxConfirmed,
  setTxFailed,
  setTxModalClose,
  setConnectModal,
} = ModalSlice.actions;

export default ModalSlice.reducer;
