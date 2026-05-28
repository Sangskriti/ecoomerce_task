import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    // ক্যাটাগরি ফেচ করা
    axios.get('https://dummyjson.com/products/categories')
      .then(res => setCategories(res.data));
  }, []);

  useEffect(() => {
    // সিলেক্টেড ক্যাটাগরি অথবা অল প্রোডাক্ট ফেচ করা
    const url = selectedCategory 
      ? `https://dummyjson.com/products/category/${selectedCategory}?limit=8&skip=${skip}`
      : `https://dummyjson.com/products?limit=8&skip=${skip}`;
    
    axios.get(url).then(res => setProducts(res.data.products));
  }, [selectedCategory, skip]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header & Filter Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Featured Products</h1>
        
        <select 
          className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer bg-white"
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSkip(0); // নতুন ক্যাটাগরি সিলেক্ট করলে প্রথম পেজ থেকে শুরু হবে
          }}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.slug} value={cat.slug}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Product Grid - responsive columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination - spaced and styled */}
      <div className="flex justify-center items-center gap-4 mt-12 mb-6">
        <button 
          onClick={() => setSkip(prev => Math.max(0, prev - 8))}
          disabled={skip === 0}
          className="px-6 py-2 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 disabled:opacity-50 transition"
        >
          Previous
        </button>
        
        <span className="text-gray-600 font-medium">
          Page {Math.floor(skip / 8) + 1}
        </span>

        <button 
          onClick={() => setSkip(prev => prev + 8)}
          className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Home;