import React from 'react';
import { Gift, Shield, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { Cart } from './Cart';
import { createCheckoutSession } from '../services/stripeService';

interface QRStickerOptionsProps {
  onSelect: () => void;
}

export function QRStickerOptions({ onSelect }: QRStickerOptionsProps) {
  const { addItem, state } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const handleGetWelcomePackage = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Add welcome package to cart if not already present
      const hasWelcomePackage = state.items.some(item => item.type === 'welcome_package');
      if (!hasWelcomePackage) {
        addItem({
          id: 'welcome_package',
          name: 'New User Welcome Package',
          price: 0,
          type: 'welcome_package'
        });
      }

      // Redirect to checkout
      await createCheckoutSession({
        successUrl: '/checkout/success',
        cancelUrl: '/register',
        items: state.items
      });
    } catch (error) {
      console.error('Checkout error:', error);
      setError('Failed to proceed to checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
          {error}
        </div>
      )}

      <div className="bg-green-50 border-2 border-green-500 rounded-lg p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 transform translate-x-6 -translate-y-6">
          <div className="absolute inset-0 bg-green-500 transform rotate-45"></div>
          <Gift className="absolute bottom-6 right-6 h-6 w-6 text-white transform rotate-45" />
        </div>
        <h4 className="text-lg font-bold text-green-800 mb-2">New User Welcome Package!</h4>
        <p className="text-green-700 max-w-3xl">
          As a new user, you'll receive both the Basic QR Tag (water resistant) and Premium Metal Tag (waterproof) 
          completely FREE with your subscription!
        </p>
      </div>
      
      <div className="border-2 border-green-500 bg-green-50 rounded-lg p-6 hover:border-blue-500 transition-all hover:shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">New User Welcome Package</h3>
            <p className="text-sm text-gray-600 mt-1">Get started with comprehensive pet protection</p>
          </div>
          <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
            <Gift className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Included Items:</h4>
            <ul className="space-y-2">
              {[
                'Basic QR Tag (Water Resistant)',
                'Premium Metal Tag (Waterproof)',
                'Easy collar attachment',
                'Instant profile setup',
                'Unlimited updates',
                '24/7 digital access'
              ].map((feature, index) => (
                <li key={index} className="flex items-center text-sm text-gray-600">
                  <Shield className="h-4 w-4 text-green-500 mr-2" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <button
          onClick={handleGetWelcomePackage}
          disabled={isProcessing}
          className="w-full py-3 px-4 rounded-md bg-green-600 hover:bg-green-700 text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? 'Processing...' : 'Get Your Free Welcome Package'}
        </button>
      </div>

      {state.items.length > 0 && <Cart />}
    </div>
  );
}