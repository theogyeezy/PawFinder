import React from 'react';
import { Building2, CheckCircle, DollarSign } from 'lucide-react';

const benefits = [
  {
    title: 'Increased Revenue',
    description: 'Generate additional income by offering PawFinder QR tags to your customers.',
    icon: DollarSign,
  },
  {
    title: 'Enhanced Service',
    description: 'Provide an additional layer of safety and peace of mind to your pet-owning customers.',
    icon: CheckCircle,
  },
  {
    title: 'Easy Integration',
    description: 'Simple setup process with full training and support from our team.',
    icon: Building2,
  },
];

export function PartnerSection() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-blue-600">Partner Program</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Become a PawFinder Partner
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Join our network of veterinarians, pet stores, and groomers offering PawFinder QR tags to their customers.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div key={benefit.title} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <benefit.icon className="h-5 w-5 flex-none text-blue-600" aria-hidden="true" />
                  {benefit.title}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{benefit.description}</p>
                </dd>
              </div>
            ))}
          </dl>
          <div className="mt-16 flex justify-center">
            <a
              href="mailto:support@pawfinder.info"
              className="rounded-md bg-blue-600 px-8 py-4 text-base font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            >
              Apply to Become a Partner
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}