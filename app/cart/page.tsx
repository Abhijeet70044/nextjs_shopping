'use client';

import { useRouter } from 'next/navigation'; // Correctly use the router
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { removeFromCart, clearCart } from '../store/cartSlice';
import { ChevronLeft } from 'lucide-react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { addToCart } from '../store/cartSlice';

export default function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  const handleRemove = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleIncreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item) {
      dispatch(removeFromCart(id));
      dispatch(
        addToCart({
          ...item,
          quantity: (item.quantity || 0) + 1,
        })
      );
    }
  };

  const handleDecreaseQuantity = (id: number) => {
    const item = cartItems.find((item) => item.id === id);
    if (item && item.quantity! > 1) {
      dispatch(removeFromCart(id));
      dispatch(
        addToCart({
          ...item,
          quantity: (item.quantity || 0) - 1,
        })
      );
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * (item.quantity || 1), 0);
  const discount = subtotal * 0.05;
  const total = subtotal - discount;

  const handleProceedToCheckout = () => {
    alert('Items are dispatched successfully!');
    dispatch(clearCart());
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="mb-4">
        <ChevronLeft
          size={32}
          onClick={() => router.push('/')}
          className="cursor-pointer"
        />
      </div>

      <h1 className="text-2xl font-bold mb-6">Cart</h1>

      {cartItems.map((item) => (
        <div key={item.id} className="bg-gray-800 p-4 rounded-lg mb-4 flex items-center justify-between">
          <img src={item.image} alt={item.title} className="h-20 w-20 object-contain" />
          <div className="flex-grow ml-4">
            <h3 className="font-semibold">{item.title}</h3>
            <p className="font-bold">${item.price}</p>
            <div className="flex items-center">
              { }
              <MinusCircle
                size={32}
                className="cursor-pointer"
                onClick={() => handleDecreaseQuantity(item.id)}
              />
              <span className="mx-4">{item.quantity}</span>
              <PlusCircle
                size={32}
                className="cursor-pointer"
                onClick={() => handleIncreaseQuantity(item.id)}
              />
            </div>
          </div>
          <button onClick={() => handleRemove(item.id)} className="text-red-500">Remove</button>
        </div>
      ))}

      { }
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

      { }
      <button onClick={handleProceedToCheckout} className="bg-yellow-400 text-black px-6 py-2 mt-6 rounded-lg w-full">
        Proceed to Checkout
      </button>
    </div>
  );
}
