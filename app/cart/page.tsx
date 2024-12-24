// pages/cart.tsx
'use client';

import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { removeFromCart } from '../store/cartSlice';
import { ChevronLeft } from 'lucide-react';
import { PlusCircle, MinusCircle } from 'lucide-react'; // Replace CirclePlus and Circle



export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalItems = useSelector((state: RootState) => state.cart.totalItems);

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const discount = subtotal * 0.05;
  const total = subtotal - discount;

  const handleProceedToCheckout = () => {
    alert('Items are dispatched successfully!');
    // Clear Redux store (you may use a specific action for this)
    dispatch({ type: 'cart/clear' });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Back Arrow */}
      <div className="mb-4">
        <ChevronLeft size={32} onClick={() => window.history.back()} className="cursor-pointer" />
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
              <PlusCircle size={32} className="cursor-pointer" />
              <span className="mx-4">{item.quantity}</span>
              <MinusCircle size={32} className="cursor-pointer" />
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
