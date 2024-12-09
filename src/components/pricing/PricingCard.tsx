import React from 'react';
import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  title: string;
  description: string;
  price: string;
  interval: string;
  features: PricingFeature[];
  isRecommended?: boolean;
  buttonText: string;
}

export function PricingCard({
  title,
  description,
  price,
  interval,
  features,
  isRecommended,
  buttonText
}: PricingCardProps) {
  return (
    <div className={`border ${isRecommended ? 'border-blue-200' : 'border-gray-200'} rounded-lg shadow-sm divide-y divide-gray-200 bg-white relative`}>
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
            Best Value
          </span>
        </div>
      )}
      <div className="p-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
        <p className="mt-4 text-sm text-gray-500">{description}</p>
        <p className="mt-8">
          <span className="text-4xl font-extrabold text-gray-900">{price}</span>
          <span className="text-base font-medium text-gray-500">{interval}</span>
        </p>
        <div className="mt-8 space-y-4">
          {features.map((feature, index) => (
            <div key={index} className="flex items-center">
              <Check className="h-5 w-5 text-green-500" />
              <span className="ml-3 text-sm text-gray-500">{feature.text}</span>
            </div>
          ))}
        </div>
        <Link
          to="/register"
          className="mt-8 block w-full bg-blue-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}