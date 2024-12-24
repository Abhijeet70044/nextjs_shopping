import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Define the Product type
interface Product {
  id: number;
  title: string;
  price: number;
  images: string[]; // Array of images
  category: string;
  rating: number;
}

// Define the ProductsState
interface ProductsState {
  products: Product[];
  status: 'idle' | 'loading' | 'failed';
}

// Initial State
const initialState: ProductsState = {
  products: [],
  status: 'idle',
};

// Async thunk to fetch products
export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
  const response = await fetch('https://dummyjson.com/products');
  const data = await response.json();
  return data.products; // Access the `products` array from API response
});

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'idle';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export default productsSlice.reducer;
