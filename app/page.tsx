'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from './store/productsSlice';
import { addToCart } from './store/cartSlice';
import { RootState, AppDispatch } from './store/store';
import { ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const products = useSelector((state: RootState) => state.products.products);
  const cartTotalItems = useSelector((state: RootState) => state.cart.totalItems);

  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (products.length > 0) {
      const uniqueCategories = ['all', ...new Set(products.map((product) => product.category))];
      setCategories(uniqueCategories);
    }
  }, [products]);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="min-h-screen bg-black text-white p-6">
      { }
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Product List</h1>
        <div
          className="relative cursor-pointer"
          onClick={() => router.push('/cart')}
        >
          <ShoppingCart
            size={32}
            className={`${cartTotalItems > 0 ? 'text-yellow-400' : 'text-gray-600'
              }`}
          />
          {cartTotalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-sm rounded-full px-2">
              {cartTotalItems}
            </span>
          )}
        </div>
      </div>

      { }
      <div className="flex gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${selectedCategory === category
              ? 'bg-yellow-400 text-black'
              : 'bg-gray-700 text-white'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      { }
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg cursor-pointer"
            onClick={() => router.push(`/product/${product.id}`)}
          >
            <img
              src={product.images[0]}
              alt={product.title}
              className="h-32 w-full object-contain mb-4"
            />
            <div className="mb-2">
              <p className="text-yellow-400 text-sm">
                ★ {product.rating.toFixed(1) || 4.0}
              </p>
              <h2 className="text-lg font-semibold truncate">{product.title}</h2>
            </div>
            <p className="font-bold">${product.price}</p>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(
                  addToCart({
                    ...product,
                    image: product.images[0],
                  })
                );
              }}
              className="bg-yellow-400 text-black px-4 py-2 mt-4 rounded w-full"
            >
              +
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
