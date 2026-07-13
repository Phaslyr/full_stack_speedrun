import { createSlice } from '@reduxjs/toolkit';
import { type Product } from'../data/products';

export interface Item extends Product {
  quantity: number,
}

export interface Cart {
  items: Array<Item>, 
  totalQuantity: number,
}

const initialState: Cart = {
  items: [],
  totalQuantity: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);

      if (item) {
        item.quantity += 1
      } else {
        state.items.push({...action.payload, quantity: 1})
      }
      state.totalQuantity += 1;
    },
    removeItem: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);

      if (item) {
        state.items = state.items.filter(i => i.id !== action.payload.id);
        state.totalQuantity -= item.quantity;
      }
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(i => i.id === action.payload.id);

      if (item) {
        if (item.quantity + action.payload.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== action.payload.id);
          state.totalQuantity -= item.quantity;
        } else {
          item.quantity += action.payload.quantity;
          state.totalQuantity += action.payload.quantity;
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;