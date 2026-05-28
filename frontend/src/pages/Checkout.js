import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { clearCart } from '../store/slices/cartSlice';

const Checkout = () => {
  const dispatch = useDispatch();
  const { items } = useSelector((state) => state.cart);

  const totalPrice = items.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  const handlePayment = async () => {
    try {
      
      const { data } = await axios.post(
        'http://localhost:5000/api/payment/create-order',
        { amount: totalPrice }
      );

      
      const options = {
        key: data.key_id || "rzp_test_Sqo9g3Cr3A1vtI", 
        amount: data.amount,
        currency: data.currency || "INR",
        order_id: data.id,
        name: "My Ecommerce Store",
        description: "Sandbox Payment Test",
        image: "https://cdn.razorpay.com/logos/GhRQcyean79PqE_medium.png",
        
        handler: async function (response) {
          try {
            
            const verify = await axios.post(
              'http://localhost:5000/api/payment/verify-payment',
              response
            );

            if (verify.data.success) {
              
              await axios.post('http://localhost:5000/api/orders', {
                items,
                totalAmount: totalPrice,
                paymentId: response.razorpay_payment_id,
                orderId: response.razorpay_order_id,
                status: 'Paid'
              });

              alert('Payment Successful');
              dispatch(clearCart());
            } else {
              alert('Payment Verification Failed');
            }
          } catch (err) {
            console.error("Verification error:", err);
            alert('Verification Failed');
          }
        },
        prefill: {
          name: "Test Customer",
          email: "customer@gmail.com",
          contact: "9832891142"
        },
        theme: {
          color: "#16a34a"
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();

    } catch (err) {
      console.error("Frontend Initialization Error:", err);
      alert('Payment initialization failed. Please ensure your backend is active.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="text-center p-10 text-xl font-semibold">Your cart is empty!</div>
    );
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
            <p className="font-bold text-blue-600">₹ {(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between items-center bg-gray-50 p-4 rounded-lg">
        <span className="text-xl font-bold text-gray-700">Total Amount:</span>
        <span className="text-2xl font-extrabold text-blue-700">₹ {totalPrice.toFixed(2)}</span>
      </div>
      <button onClick={handlePayment} className="w-full mt-6 bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition">
        Pay Now
      </button>
    </div>
  );
};

export default Checkout;