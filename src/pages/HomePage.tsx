import React from 'react';
import { HomeHero } from '../components/HomeHero';
import { Features } from '../components/Features';
import { FAQ } from '../components/FAQ';
import { Pricing } from '../components/Pricing';
import { Team } from '../components/Team';
import { PartnerSection } from '../components/PartnerSection';

export function HomePage() {
  return (
    <div className="bg-white">
      <HomeHero />
      <Features />
      <Pricing />
      <div id="faq" className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="lg:grid lg:grid-cols-3 lg:gap-8">
          <div>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Frequently asked questions
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Can't find the answer you're looking for? Contact our support team at{' '}
              <a href="mailto:support@pawfinder.info" className="font-medium text-blue-600 hover:text-blue-500">
                support@pawfinder.info
              </a>
            </p>
          </div>
          <div className="mt-12 lg:mt-0 lg:col-span-2">
            <FAQ />
          </div>
        </div>
      </div>
      <Team />
      <PartnerSection />
    </div>
  );
}