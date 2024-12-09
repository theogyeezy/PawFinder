import React from 'react';
import { BetaSignup } from '../components/BetaSignup';
import { BackButton } from '../components/BackButton';
import { FAQ } from '../components/FAQ';
import { Features } from '../components/Features';
import { Tag } from 'lucide-react';

export function BetaPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-6">
          <BackButton />
        </div>
        
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Join the PawFinder Beta</h1>
          <p className="text-lg text-gray-600">
            Be among the first to try PawFinder and help shape the future of pet safety. 
            Our private beta starts December 1st, 2024.
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-16">
          <div className="px-6 py-8">
            <BetaSignup />
          </div>
          
          <div className="bg-gray-50 px-6 py-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Exclusive Beta Benefits</h2>
            <ul className="space-y-4 text-gray-600">
              <li className="flex items-start">
                <Tag className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="ml-3">
                  <span className="font-semibold text-blue-600">50% off annual membership</span> - Pay only $60/year instead of $120
                </span>
              </li>
              <li className="flex items-start">
                <Tag className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="ml-3">
                  <span className="font-semibold text-blue-600">Waived activation fee</span> - Save on initial setup costs
                </span>
              </li>
              <li className="flex items-start">
                <Tag className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="ml-3">Early access to all PawFinder features</span>
              </li>
              <li className="flex items-start">
                <Tag className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="ml-3">Beta pricing locked in for life</span>
              </li>
              <li className="flex items-start">
                <Tag className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="ml-3">Direct access to our product team</span>
              </li>
              <li className="flex items-start">
                <Tag className="h-5 w-5 text-blue-600 mt-0.5" />
                <span className="ml-3">Help shape the future of pet safety technology</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Product Comparison Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Why Choose PawFinder?
          </h2>
          <Features />
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <FAQ />
          </div>
        </div>
      </div>
    </div>
  );
}