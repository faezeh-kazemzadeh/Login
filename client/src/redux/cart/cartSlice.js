import { createSlice } from "@reduxjs/toolkit";
import { sumProducts, totalPrice } from "../../utils/helper";

const initialState = {
  selectedItems: [],
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
        !state.selectedItems.find((item) => item._id === action.payload._id)
      ) {
        state.selectedItems.push({ ...action.payload, quantity: 1 });
        state.itemsCounter = sumProducts(state.selectedItems);
        state.total = totalPrice(state.selectedItems);
        state.checkOut = false;
      }
    },
    removeFromCart:(state,action)=>{
      const newSelectedItems=state.selectedItems.filter(item=>item._id!==action.payload._id);
      state.selectedItems=newSelectedItems;
      state.itemsCounter=sumProducts(newSelectedItems);
      state.total=totalPrice(newSelectedItems);
      state.checkOut=false;
    },
    increase:(state,action)=>{
      const increaseIndex=state.selectedItems.findIndex(item=>item._id===action.payload._id)
      state.selectedItems[increaseIndex].quantity++;
      state.itemsCounter=sumProducts(state.selectedItems)
      state.total=totalPrice(state.selectedItems)
    },
    decrease:(state,action)=>{
      const decreaseIndex = state.selectedItems.findIndex(item=>item._id=== action.payload._id)
      state.selectedItems[decreaseIndex].quantity--;
      state.itemsCounter=sumProducts(state.selectedItems)
      state.total=totalPrice(state.selectedItems)
    }
  },
});

export const { addToCart ,removeFromCart , increase , decrease } = cartSlice.actions;
export default cartSlice.reducer;
