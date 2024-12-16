import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isConnected: false,
  account: null,
  ethereum: null,
  profile: null,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setConnect: (state, action) => {
      state.account = action.payload;
      state.isConnected = true;
    },
    setEthereum: (state, action) => {
      state.ethereum = action.payload;
    },
    setDisconnect: (state, action) => {
      state.account = null;
      state.isConnected = false;
    },
    setProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
});

export const { setConnect, setDisconnect, setProfile, setEthereum } =
  AuthSlice.actions;

export default AuthSlice.reducer;
