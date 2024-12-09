import React from 'react';
import { QrCode, Shield, Smartphone, Zap, Waves, DollarSign } from 'lucide-react';

const features = [
  {
    name: 'Quick Scanning',
    description: 'Instant access to your pet\'s profile with a simple QR code scan from any smartphone.',
    icon: QrCode,
  },
  {
    name: 'Secure Information',
    description: 'You control what information is visible. Your data is protected and can be updated anytime.',
    icon: Shield,
  },
  {
    name: 'Mobile Friendly',
    description: 'Works on all modern devices without requiring any special apps or software.',
    icon: Smartphone,
  },
];

const comparisons = [
  {
    name: 'PawFinder QR',
    price: '$12.99/month',
    features: [
      'Affordable monthly subscription',
      'No additional hardware costs',
      'Free metal QR tag included',
      'Waterproof options',
      'Unlimited profile updates',
      'Works with any smartphone'
    ],
    recommended: true
  },
  {
    name: 'Apple AirTag',
    price: '$29 + Monthly Battery',
    features: [
      'Higher upfront cost',
      'Requires iPhone',
      'Regular battery replacement needed',
      'Limited range',
      'Additional accessories needed',
      'Not designed for pets'
    ]
  },
  {
    name: 'Fi Collar',
    price: '$149 + $99/year',
    features: [
      'Expensive hardware cost',
      'High annual subscription',
      'Limited battery life',
      'Bulky design',
      'Coverage limitations',
      'Requires special collar'
    ]
  }
];

export function Features() {
  return (
    <div id="features" className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-2xl sm:text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to keep your pet safe
          </p>
        </div>

        <div className="mt-10">
          <div className="space-y-8 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-3 sm:gap-6 lg:gap-8">
            {features.map((feature) => (
              <div key={feature.name} className="relative bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center mb-4">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                    <feature.icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <h3 className="ml-4 text-lg leading-6 font-medium text-gray-900">{feature.name}</h3>
                </div>
                <p className="text-base text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-2">
            Why Choose PawFinder?
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Compare our affordable solution with other pet tracking options
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {comparisons.map((option) => (
              <div 
                key={option.name}
                className={`relative rounded-lg border ${
                  option.recommended 
                    ? 'border-blue-500 shadow-lg' 
                    : 'border-gray-200'
                } p-6`}
              >
                {option.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-sm">
                      Best Value
                    </span>
                  </div>
                )}
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {option.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">
                  {option.price}
                </p>
                
                <ul className="space-y-3">
                  {option.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-5 w-5 text-blue-500">
                        {option.recommended ? (
                          <Shield className="h-5 w-5" />
                        ) : (
                          <DollarSign className="h-5 w-5" />
                        )}
                      </span>
                      <span className="ml-2 text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}