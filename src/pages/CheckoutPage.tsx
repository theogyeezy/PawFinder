import React, { useState, useEffect } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { CheckoutForm } from '../components/CheckoutForm';
import { BackButton } from '../components/BackButton';
import { useCart } from '../contexts/CartContext';
import { Cart } from '../components/Cart';

const stripePromise = loadStripe('pk_test_51QTE5pDeHbm9zTfaLXAlNrk1swkfc2o10qyTUNhzPzkDevWwV14epT0qhXGHjuKEgRN7WEAdvaqCqhJMOBDmsiai00GvGqtrnz');

const appearance = {
  theme: 'stripe',
  variables: {
    colorPrimary: '#2563eb',
  },
};

export function CheckoutPage() {
  const { state } = useCart();
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (state.items.length > 0) {
      setIsLoading(true);
      setError(null);

      fetch('/.netlify/functions/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ items: state.items }),
      })
        .then(async (res) => {
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || 'Failed to create payment intent');
          }
          return data;
        })
        .then((data) => {
          setClientSecret(data.clientSecret);
        })
        .catch((err) => {
          console.error('Payment intent error:', err);
          setError(err.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [state.items]);

  if (state.items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Your cart is empty</h2>
          <p className="mt-2 text-gray-600">Add items to your cart to proceed with checkout</p>
          <BackButton className="mt-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Checkout</h2>
            
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-600 p-4 rounded-md">
                {error}
              </div>
            )}

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Preparing checkout...</p>
              </div>
            ) : clientSecret ? (
              <Elements 
                stripe={stripePromise} 
                options={{ 
                  clientSecret,
                  appearance 
                }}
              >
                <CheckoutForm />
              </Elements>
            ) : null}
          </div>
        </div>

        <div className="md:col-span-1">
          <Cart />
        </div>
      </div>
    </div>
  );
}