import { createSlice } from "@reduxjs/toolkit";
import { sumProducts, totalPrice } from "../../utils/helper";

const initialState = {
  selectedItems: [ ],
  total: 0,
  itemsCounter: 0,
  checkOut: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      if (
        !state.selectedItems.find((item) => {
          item._id === action.payload._id;
        })
      ) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
        state.itemsCounter = sumProducts(state.selectedItems);
        state.total = totalPrice(state.selectedItems);
        state.checkOut = false;
      }
    },
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
