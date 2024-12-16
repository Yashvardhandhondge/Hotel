import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nfts: {},
};

export const NFTSlice = createSlice({
  name: "nft",
  initialState,
  reducers: {
    updateNFTStore: (state, action) => {
      if (action.payload.token_id)
        state.nfts[action.payload.token_id] = action.payload;
    },
  },
});

export const { updateNFTStore } = NFTSlice.actions;

export default NFTSlice.reducer;
