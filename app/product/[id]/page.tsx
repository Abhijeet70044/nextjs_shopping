'use client';

import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { ChevronLeft, CirclePlus, Circle } from 'lucide-react';
import { addToCart } from '../../store/cartSlice';
import { useState, useEffect } from 'react';
import { Product } from '../../store/productsSlice'; // Correctly import the Product interface
import { useParams } from 'next/navigation'; // Import useParams

// ProductDetail component
const ProductDetail = () => {
  const { id } = useParams(); // Access the params using useParams hook
  const [product, setProduct] = useState<Product | null>(null); // Initializing with null
  const dispatch = useDispatch();
  const router = useRouter();

  const [quantity, setQuantity] = useState<number>(1);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    if (product) {
      // Ensure that product is not null before calling addToCart
      dispatch(
        addToCart({
          ...product, // Spread existing product properties
          quantity: 1, // Add quantity dynamically
          image: product.images[0], // If image is used differently in the cart
        })
      );
    }
  };

  useEffect(() => {
    if (id) {
      // Fetch the product data on component mount
      const fetchProduct = async () => {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data); // Set the fetched product data
      };

      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return <div>Loading...</div>; // Display loading message until product is available
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Back Arrow */}
      <div className="mb-4">
        <ChevronLeft size={32} onClick={() => router.push('/')} className="cursor-pointer" />
      </div>

      {/* Product Details */}
      <div className="bg-gray-800 p-6 rounded-lg shadow">
        <img src={product.images[0]} alt={product.title} className="h-64 w-full object-contain mb-4" />
        <h2 className="text-2xl font-semibold truncate">{product.title}</h2>
        <p className="font-bold text-yellow-400">${product.price}</p>
        <p className="text-sm text-gray-300 mb-4">★ {product.rating.toFixed(1)}</p>

        {/* Product Description */}
        <div className="text-gray-300 text-sm mb-6">
          <h3 className="font-semibold text-lg mb-2">Description:</h3>
          <p>{product.description}</p>
        </div>

        {/* Quantity Control */}
        <div className="flex items-center mb-6">
          <CirclePlus size={32} onClick={handleIncrease} className="cursor-pointer" />
          <span className="mx-4">{quantity}</span>
          <Circle size={32} onClick={handleDecrease} className="cursor-pointer" />
        </div>

        {/* Add to Cart Button */}
        <button onClick={handleAddToCart} className="bg-yellow-400 text-black px-6 py-2 rounded-lg w-full">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;
