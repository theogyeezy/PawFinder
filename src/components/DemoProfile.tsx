import React from 'react';
import { Phone, MapPin, Instagram, PawPrint } from 'lucide-react';
import { BackButton } from './BackButton';

const demoDog = {
  name: 'Luna',
  breed: 'Siberian Husky',
  description: 'Friendly and energetic Husky who loves treats. If found, she is very responsive to her name and treat oriented.',
  ownerName: 'Matt Yee',
  phoneNumber: '(555) 123-4567',
  address: '123 Main St, Austin, TX',
  instagram: '@theogyeezy',
  imageUrl: 'https://i.ibb.co/VMBsWFB/IMG-1679.jpg'
};

export function DemoProfile() {
  return (
    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="mb-6">
        <BackButton />
      </div>
      
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-2xl mx-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{demoDog.name}</h2>
              <p className="text-gray-600">{demoDog.breed}</p>
            </div>
            <PawPrint className="h-8 w-8 text-blue-600" />
          </div>

          <img
            src={demoDog.imageUrl}
            alt={demoDog.name}
            className="w-full h-64 object-cover rounded-lg mb-6"
          />

          <p className="text-gray-700 mb-6">{demoDog.description}</p>

          <div className="space-y-4">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-700">{demoDog.phoneNumber}</span>
            </div>

            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-gray-700">{demoDog.address}</span>
            </div>

            <div className="flex items-center">
              <Instagram className="h-5 w-5 text-gray-400 mr-3" />
              <a
                href={`https://instagram.com/${demoDog.instagram.replace('@', '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800"
              >
                {demoDog.instagram}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}