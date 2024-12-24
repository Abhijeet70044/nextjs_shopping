'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { removeFromCart, clearCart } from '../store/cartSlice'; // Import clearCart
import { ChevronLeft } from 'lucide-react';
import { PlusCircle, MinusCircle } from 'lucide-react'; // Use PlusCircle and MinusCircle
import { addToCart } from '../store/cartSlice';

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(
        removeFromCart(id) // First, remove the item with the old quantity
      );
      dispatch(
        addToCart({
          ...item,
          quantity: (item.quantity || 0) + 1, // Increase the quantity
        })
      );
    }
  };

  const handleDecreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity! > 1) {
      dispatch(
        removeFromCart(id) // First, remove the item with the old quantity
      );
      dispatch(
        addToCart({
          ...item,
          quantity: (item.quantity || 0) - 1, // Decrease the quantity
        })
      );
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const discount = subtotal * 0.05;
  const total = subtotal - discount;

  const handleProceedToCheckout = () => {
    alert('Items are dispatched successfully!');
    dispatch(clearCart()); // Clear the cart after proceeding to checkout
    window.location.href = '/'; // Redirect to the home page
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      {/* Back Arrow */}
      <div className="mb-4">
        <ChevronLeft size={32} onClick={() => window.location.href = '/'} className="cursor-pointer" />
      </div>

      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      {/* Cart Items */}
      {cartItems.map((item) => (
        <div key={item.id} className="bg-gray-800 p-4 rounded-lg mb-4 flex items-center justify-between">
          <img src={item.image} alt={item.title} className="h-20 w-20 object-contain" />
          <div className="flex-grow ml-4">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="font-bold">${item.price}</p>
            <div className="flex items-center">
              {/* Quantity control */}
              <MinusCircle
                size={32}
                className="cursor-pointer"
                onClick={() => handleDecreaseQuantity(item.id)} // Decrease quantity
              />
              <span className="mx-4">{item.quantity}</span>
              <PlusCircle
                size={32}
                className="cursor-pointer"
                onClick={() => handleIncreaseQuantity(item.id)} // Increase quantity
              />
            </div>
          </div>
          <button onClick={() => handleRemove(item.id)} className="text-red-500">Remove</button>
        </div>
      ))}

      {/* Cart Totals */}
      <div className="bg-gray-800 p-4 rounded-lg mt-6">
        <div className="flex justify-between mb-2">
          <span>Subtotal:</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between mb-2">
          <span>Discount (5%):</span>
          <span>-${discount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold text-xl">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      {/* Proceed to Checkout */}
      <button onClick={handleProceedToCheckout} className="bg-yellow-400 text-black px-6 py-2 mt-6 rounded-lg w-full">
        Proceed to Checkout
      </button>
    </div>
  );
}
