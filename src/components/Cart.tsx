import React from 'react';
import { useCart } from '../contexts/CartContext';
import { ShoppingCart, X } from 'lucide-react';

export function Cart() {
  const { state, removeItem } = useCart();
  const [isOpen, setIsOpen] = React.useState(true);

  if (state.items.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-lg p-4 max-w-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <ShoppingCart className="h-5 w-5 text-blue-600 mr-2" />
            <h3 className="text-lg font-medium">Your Cart</h3>
          </div>
          <span className="text-sm font-medium text-gray-900">
            Total: ${state.total.toFixed(2)}
          </span>
        </div>
        
        <div className="space-y-3">
          {state.items.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between bg-gray-50 p-3 rounded-md"
            >
              <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500">${item.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => removeItem(item.id)}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Remove item"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}