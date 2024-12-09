import React from 'react';
import { Check, PawPrint, QrCode, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Pricing() {
  return (
    <div id="pricing" className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Simple, Affordable Protection
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Choose the plan that works best for you and your furry friend
          </p>
          <div className="mt-4">
            <Link
              to="/beta"
              className="inline-flex items-center text-blue-600 hover:text-blue-500"
            >
              <span className="mr-2">🎉</span>
              Join our beta program for 50% off annual plans!
            </Link>
          </div>
        </div>

        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto">
          {/* Monthly Plan */}
          <div className="border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white">
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Monthly Protection</h3>
              <p className="mt-4 text-sm text-gray-500">Perfect for trying out our service</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$12.99</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="ml-3 text-sm text-gray-500">1 Metal QR Code Ring</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="ml-3 text-sm text-gray-500">1 Water Resistant Sticker</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="ml-3 text-sm text-gray-500">24/7 Digital Profile Access</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="ml-3 text-sm text-gray-500">Unlimited Profile Updates</span>
                </div>
              </div>
              <Link
                to="/register"
                className="mt-8 block w-full bg-blue-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
              >
                Get Started Monthly
              </Link>
            </div>
          </div>

          {/* Annual Plan */}
          <div className="border border-blue-200 rounded-lg shadow-sm divide-y divide-gray-200 bg-white relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
              <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium">
                Best Value
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900">Annual Protection</h3>
              <p className="mt-4 text-sm text-gray-500">Save $35.88 with annual billing</p>
              <div className="mt-8">
                <div className="flex items-center justify-center">
                  <span className="text-4xl font-extrabold text-gray-900">$120</span>
                  <span className="text-base font-medium text-gray-500">/year</span>
                </div>
                <p className="mt-1 text-sm text-center text-blue-600">
                  Beta users get 50% off - only $60/year!
                </p>
              </div>
              <div className="mt-8 space-y-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="ml-3 text-sm text-gray-500">1 Metal QR Code Ring</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="ml-3 text-sm text-gray-500">1 Water Resistant Sticker</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="ml-3 text-sm text-gray-500">24/7 Digital Profile Access</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="ml-3 text-sm text-gray-500">Unlimited Profile Updates</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="ml-3 text-sm text-gray-500">Priority Support</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500" />
                  <span className="ml-3 text-sm text-gray-500">Free Replacement Tags</span>
                </div>
              </div>
              <Link
                to="/register"
                className="mt-8 block w-full bg-blue-600 text-white rounded-md py-2 text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-center"
              >
                Get Started Annually
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 text-center">
          <p className="text-base text-gray-500">
            All plans include the initial QR tag set. Additional tags can be purchased separately.
          </p>
        </div>
      </div>
    </div>
  );
}