import React from 'react';
import { Check, Clock, Calendar } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface Plan {
  id: string;
  name: string;
  price: number;
  interval: string;
  description: string;
  features: string[];
  stripeProductId: string;
}

interface SubscriptionPlanSelectorProps {
  onSelect: () => void;
}

const plans: Plan[] = [
  {
    id: 'monthly',
    name: 'Monthly Protection',
    price: 12.99,
    interval: '/month',
    description: 'Perfect for trying out our service',
    stripeProductId: 'prod_RLwKSfixcXl3dM',
    features: [
      '1 Metal QR Code Ring',
      '1 Water Resistant Sticker',
      '24/7 Digital Profile Access',
      'Unlimited Profile Updates'
    ]
  },
  {
    id: 'annual',
    name: 'Annual Protection',
    price: 120,
    interval: '/year',
    description: 'Save $35.88 with annual billing',
    stripeProductId: 'prod_RLwL32cJzw7kle',
    features: [
      '1 Metal QR Code Ring',
      '1 Water Resistant Sticker',
      '24/7 Digital Profile Access',
      'Unlimited Profile Updates',
      'Priority Support',
      'Free Replacement Tags'
    ]
  }
];

export function SubscriptionPlanSelector({ onSelect }: SubscriptionPlanSelectorProps) {
  const { addItem } = useCart();
  const [selectedPlan, setSelectedPlan] = React.useState<Plan | null>(null);

  const handlePlanSelect = (plan: Plan) => {
    setSelectedPlan(plan);
    addItem({
      id: plan.id,
      name: plan.name,
      price: plan.price,
      type: 'subscription'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-medium text-gray-900">Choose Your Protection Plan</h2>
        <p className="mt-1 text-sm text-gray-500">
          Select a subscription plan to protect your pet
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative rounded-lg border p-4 cursor-pointer transition-all ${
              selectedPlan?.id === plan.id
                ? 'border-blue-500 ring-2 ring-blue-500'
                : 'border-gray-300 hover:border-blue-500'
            }`}
            onClick={() => handlePlanSelect(plan)}
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
                <p className="text-sm text-gray-500">{plan.description}</p>
              </div>
              {plan.id === 'monthly' ? (
                <Clock className="h-6 w-6 text-blue-500" />
              ) : (
                <Calendar className="h-6 w-6 text-blue-500" />
              )}
            </div>

            <div className="mb-4">
              <span className="text-2xl font-bold text-gray-900">${plan.price}</span>
              <span className="text-gray-500">{plan.interval}</span>
            </div>

            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-green-500 flex-shrink-0 mr-2" />
                  <span className="text-sm text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            {selectedPlan?.id === plan.id && (
              <div className="absolute -top-2 -right-2">
                <div className="rounded-full bg-blue-500 p-1">
                  <Check className="h-4 w-4 text-white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8">
        <button
          onClick={onSelect}
          disabled={!selectedPlan}
          className="w-full sm:w-auto flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Continue to Welcome Package
        </button>
      </div>
    </div>
  );
}