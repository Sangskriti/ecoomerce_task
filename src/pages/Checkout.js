import React from 'react';
import { useSelector } from 'react-redux';

const Checkout = () => {
  const { items } = useSelector((state) => state.cart);
  const totalPrice = items.reduce((total, item) => total + (item.price * item.quantity), 0);

  if (items.length === 0) {
    return <div className="text-center p-10 text-xl">Your cart is empty!</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-xl mt-10">
      <h2 className="text-2xl font-bold mb-6 border-b pb-4">Checkout Summary</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-semibold text-gray-800">{item.title}</p>
              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
            </div>
            <p className="font-bold text-blue-600">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
        <span className="text-xl font-bold text-gray-700">Total Amount:</span>
        <span className="text-2xl font-extrabold text-blue-700">${totalPrice.toFixed(2)}</span>
      </div>
      <button className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
        Confirm Order
      </button>
    </div>
  );
};

export default Checkout;