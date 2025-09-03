import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      state.cart.push(action.payload);
    },
    deleteItem: (state, action) => {
      state.cart = state.cart.filter((item) => item.pizzaId !== action.payload);
    },
    increaseItemQuantity: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    decreaseItemQuantity: (state, action) => {
      const item = state.cart.find((item) => item.pizzaId === action.payload);

      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;

      if (item.quantity <= 0) cartSlice.caseReducers.deleteItem(state, action);
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
  selectors: {
    getCart: (state) => state.cart,
    getCurrentQuantityById: (state, id) =>
      state.cart.find((item) => item.pizzaId === id)?.quantity ?? 0,
    getTotalCartQuantity: (state) =>
      state.cart.reduce((sum, item) => sum + item.quantity, 0),
    getTotalCartPrice: (state) =>
      state.cart.reduce((sum, item) => sum + item.totalPrice, 0),
  },
});

export const { actions, selectors, reducer } = cartSlice;

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = actions;

export const {
  getCart,
  getCurrentQuantityById,
  getTotalCartQuantity,
  getTotalCartPrice,
} = selectors;

export default reducer;
