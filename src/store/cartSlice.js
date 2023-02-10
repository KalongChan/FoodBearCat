import {createSlice} from "@reduxjs/toolkit";

const initialState = {items: []};

const saveItems = (item) => {
  localStorage.setItem("cart", JSON.stringify(item));
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // ==========Set localStorage to Redux if exists==========

    getLocalStorageData: (state, action) => {
      state.items = action.payload;
    },

    // ==========Add items to cart==========

    addToCart: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );

      // Add item to cart if not found in cart
      if (index >= 0) {
        let newCart = [...state.items];
        newCart[index] = {
          ...newCart[index],
          quantity: newCart[index].quantity + 1,
        };
        state.items = newCart;

        // Increase found item in cart by 1
      } else {
        let newItem = {...action.payload};
        state.items = [...state.items, newItem];
      }
      saveItems(state.items.map((item) => item));
    },

    // ==========Update item quantity in cart==========

    updateQuantity: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );

      // Increase quantity if quantity >= 1
      if (index >= 0) {
        if (action.payload.quantity >= 1) {
          let newCart = [...state.items];
          newCart[index] = action.payload;
          state.items = newCart;

          // Delete item from cart if quantity === 0
        } else {
          state.items = state.items.filter(
            (item) => item._id !== action.payload._id
          );
        }
      }
      saveItems(state.items.map((item) => item));
    },

    //==========Remove item from cart==========
    removeItem: (state, action) => {
      const index = state.items.findIndex(
        (cartItem) => cartItem._id === action.payload._id
      );
      if (index >= 0) {
        state.items = state.items.filter(
          (item) => item._id !== action.payload._id
        );
      }
      saveItems(state.items.map((item) => item));
    },
    // ==========Update item quantity in cart==========

    removeAllItems: (state, action) => {
      state.items = [];
      saveItems(state.items.map((item) => item));
    },
  },
});

export const {
  getLocalStorageData,
  addToCart,
  updateQuantity,
  removeItem,
  removeAllItems,
} = cartSlice.actions;

export default cartSlice.reducer;
