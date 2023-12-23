import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  adminInfo: [],
  products: [],

  sortBy: [""],

  price: [0],
  Rnvoice: {
    show: false,
    data: [],
  },
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
      }
    },
    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
      }
    },
    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
    },
    resetCart: (state) => {
      state.products = [];
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    adminInfo: (state, action) => {
      state.adminInfo = action.payload;
    },

    sortBy: (state, action) => {
      state.sortBy = action.payload;
    },
    price: (state, action) => {
      state.price = action.payload;
    },
    Rnvoice: (state, action) => {
      state.Rnvoice = action.payload;
    },
  },
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart,
  setUserInfo,
  price,
  sortBy,
  adminInfo,
  Rnvoice,
} = orebiSlice.actions;
export default orebiSlice.reducer;
