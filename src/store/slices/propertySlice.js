import { createSlice } from '@reduxjs/toolkit';

const propertySlice = createSlice({
  name: 'property',
  initialState: {
    wishlist: [],
    compare: []
  },
  reducers: {
    toggleWishlist(state, action) {
      const propertyId = action.payload;
      if (state.wishlist.includes(propertyId)) {
        state.wishlist = state.wishlist.filter((id) => id !== propertyId);
      } else {
        state.wishlist.push(propertyId);
      }
    },
    toggleCompare(state, action) {
      const propertyId = action.payload;
      if (state.compare.includes(propertyId)) {
        state.compare = state.compare.filter((id) => id !== propertyId);
      } else if (state.compare.length < 3) {
        state.compare.push(propertyId);
      }
    },
    clearCompare(state) {
      state.compare = [];
    }
  }
});

export const { toggleWishlist, toggleCompare, clearCompare } = propertySlice.actions;
export default propertySlice.reducer;
