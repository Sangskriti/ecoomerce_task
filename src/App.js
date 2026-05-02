import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ShoppingCart, LogOut, LogIn } from 'lucide-react'; 
import { logout } from './store/slices/authSlice';

import Home from './pages/Home';
import Login from './pages/Login';
import Checkout from './pages/Checkout';

function App() {
  const dispatch = useDispatch();
  
  const { token } = useSelector((state) => state.auth);
  const { items } = useSelector((state) => state.cart);

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <nav className="bg-white shadow-md p-4 flex justify-between items-center sticky top-0 z-50">
          <Link to="/" className="text-xl font-bold text-blue-600">E-Shop</Link>
          
          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-blue-500 font-medium">Home</Link>
            
            <Link to="/checkout" className="relative flex items-center gap-1 hover:text-blue-500">
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
              <span className="font-medium">Cart</span>
            </Link>

            
            {token ? (
              <button 
                onClick={handleLogout}
                className="flex items-center gap-1 text-red-600 hover:text-red-800 font-bold bg-red-50 px-3 py-1.5 rounded-lg transition"
              >
                <LogOut size={18} /> Logout
              </button>
            ) : (
              <Link to="/login" className="flex items-center gap-1 text-green-600 hover:text-green-800 font-bold bg-green-50 px-3 py-1.5 rounded-lg transition">
                <LogIn size={18} /> Login
              </Link>
            )}
          </div>
        </nav>

        <main className="p-4">
          <Routes>
            <Route path="/" element={<Home />} />
            
            <Route path="/login" element={token ? <Navigate to="/" /> : <Login />} />
            
            <Route 
              path="/checkout" 
              element={token ? <Checkout /> : <Navigate to="/login" />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;