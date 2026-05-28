import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/slices/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
      {/* Product Image - Container with fixed height to keep cards uniform */}
      <div className="h-48 bg-gray-50 flex items-center justify-center p-4">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="max-h-full max-w-full object-contain" 
        />
      </div>

      {/* Body */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800 mb-1 line-clamp-1">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 mb-3 line-clamp-2 italic">
          {product.category}
        </p>
        
        <div className="mt-auto flex justify-between items-center">
          <span className="text-lg font-bold text-blue-600">
            ${product.price}
          </span>
          <button 
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold py-2 px-4 rounded-lg transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;