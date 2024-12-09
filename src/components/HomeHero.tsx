import React, { useState } from 'react';
import { PawPrint, QrCode, Shield, MapPin, Zap, Smartphone } from 'lucide-react';
import { Link } from 'react-router-dom';
import QRCode from 'react-qr-code';
import { DemoProfile } from './DemoProfile';

export function HomeHero() {
  const [showDemo, setShowDemo] = useState(false);

  const scrollToPricing = () => {
    const pricingSection = document.querySelector('#pricing');
    pricingSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const demoUrl = `${window.location.origin}/demo`;

  return (
    <div className="relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 lg:w-full">
          <main className="mt-6 sm:mt-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="text-center lg:text-left lg:col-span-6">
                <h1>
                  <span className="block text-sm font-semibold uppercase tracking-wide text-blue-600 sm:text-base lg:text-sm xl:text-base">
                    Smart Pet Protection
                  </span>
                  <span className="mt-1 block text-3xl sm:text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                    <span className="block text-gray-900">Lost Pet?</span>
                    <span className="block text-blue-600 mt-1">Found in Seconds</span>
                  </span>
                </h1>

                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl px-4 sm:px-0">
                  Safer than GPS trackers, more reliable than microchips. Our QR tags instantly connect lost pets with their families - no batteries, no radiation, just peace of mind for $12.99/month.
                </p>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-0">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 flex items-center justify-center sm:justify-start">
                      <Zap className="h-5 w-5 text-blue-500 mr-2" />
                      Instant Connection
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Anyone with a phone can scan and instantly see your pet's profile and contact info
                    </p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 flex items-center justify-center sm:justify-start">
                      <Shield className="h-5 w-5 text-blue-500 mr-2" />
                      No Monthly Charging
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Unlike GPS trackers, our tags never need charging and always work
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 flex items-center justify-center sm:justify-start">
                      <Smartphone className="h-5 w-5 text-blue-500 mr-2" />
                      Works Everywhere
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      No special app needed - works with any smartphone camera worldwide
                    </p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 flex items-center justify-center sm:justify-start">
                      <PawPrint className="h-5 w-5 text-blue-500 mr-2" />
                      Free Welcome Package
                    </h3>
                    <p className="mt-1 text-sm text-gray-600">
                      Get a metal QR ring and water-resistant tag free with subscription
                    </p>
                  </div>
                </div>

                <div className="mt-8 px-4 sm:px-0">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <Link
                      to="/register"
                      className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg"
                    >
                      Get Started
                    </Link>
                    <button
                      onClick={scrollToPricing}
                      className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg"
                    >
                      See Pricing
                    </button>
                    <Link
                      to="/beta"
                      className="flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg"
                    >
                      Join Beta
                    </Link>
                  </div>
                </div>
              </div>

              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <div className="relative block w-full bg-white rounded-lg overflow-hidden">
                    <img
                      className="w-full"
                      src="https://i.ibb.co/VMBsWFB/IMG-1679.jpg"
                      alt="Happy dog wearing a PawFinder QR tag"
                    />
                    <div className="absolute inset-0 w-full h-full flex items-center justify-center">
                      <Link
                        to="/demo"
                        className="bg-white bg-opacity-90 p-4 rounded-lg shadow-lg hover:bg-opacity-100 transition-all cursor-pointer"
                      >
                        <div className="text-center">
                          <QRCode
                            value={demoUrl}
                            size={88}
                          />
                          <p className="mt-2 text-sm font-medium text-gray-900">
                            Tap to Try It Now
                          </p>
                        </div>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-2xl">
            <button
              onClick={() => setShowDemo(false)}
              className="absolute -top-12 right-0 text-white hover:text-gray-300"
            >
              Close Demo
            </button>
            <DemoProfile />
          </div>
        </div>
      )}
    </div>
  );
}