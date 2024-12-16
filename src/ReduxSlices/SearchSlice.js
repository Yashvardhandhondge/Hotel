import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  amenities: {
    bathroom: 0,
    bedroom: 0,
    bed: 0,
    squareFeet: "",
  },
  priceRange: null,
  propertyType: null,
  filter: null,
  amenitiesEssentials: null,
  instantBook: false,
  allowPets: false,
};

export const SearchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setAmenities: (state, action) => {
      state.amenities = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setPropertyType: (state, action) => {
      state.propertyType = action.payload;
    },
    setAmenitiesEssentials: (state, action) => {
      state.amenitiesEssentials = action.payload;
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setInstantBook: (state, action) => {
      state.instantBook = action.payload;
    },
    setAllowPets: (state, action) => {
      state.allowPets = action.payload;
    },
  },
});

export const {
  setAmenities,
  setAmenitiesEssentials,
  setFilter,
  setPriceRange,
  setPropertyType,
  setAllowPets,
  setInstantBook,
} = SearchSlice.actions;

export default SearchSlice.reducer;
