import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define the Product type
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  quantity?: number; // To track cart quantity
}

// Define the CartState
interface CartState {
  items: Product[];
  totalItems: number;
}

// Initial State
const initialState: CartState = {
  items: [],
  totalItems: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity = (existingItem.quantity || 1) + 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.totalItems++;
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === productId);

      if (existingItemIndex > -1) {
        const existingItem = state.items[existingItemIndex];
        state.totalItems -= existingItem.quantity || 1;
        state.items.splice(existingItemIndex, 1);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
