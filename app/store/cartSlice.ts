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
        // If the item already exists in the cart, increase its quantity by the quantity from the payload
        existingItem.quantity = (existingItem.quantity || 0) + (product.quantity || 1);
      } else {
        // If the item doesn't exist, add it to the cart with the provided quantity
        state.items.push({ ...product, quantity: product.quantity || 1 });
      }

      // Update the totalItems based on the new quantity
      state.totalItems = state.items.reduce((total, item) => total + (item.quantity || 0), 0);
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const existingItemIndex = state.items.findIndex((item) => item.id === productId);

      if (existingItemIndex > -1) {
        const existingItem = state.items[existingItemIndex];
        state.totalItems -= existingItem.quantity || 1; // Subtract the quantity of the removed item
        state.items.splice(existingItemIndex, 1); // Remove the item from the cart
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0; // Reset the totalItems to 0 when the cart is cleared
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
