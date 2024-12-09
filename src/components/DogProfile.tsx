import React, { useState } from 'react';
import { DogProfile as DogProfileType } from '../types/dog';
import { Instagram, Phone, MapPin, ShoppingBag } from 'lucide-react';
import QRCode from 'react-qr-code';
import { QRStickerOptions } from './QRStickerOptions';

interface DogProfileProps {
  profile: DogProfileType;
}

export function DogProfile({ profile }: DogProfileProps) {
  const [showStickerOptions, setShowStickerOptions] = useState(false);

  const handleStickerSelect = (option: any) => {
    // Here you would typically integrate with a payment processor
    alert(`Selected ${option.name} for $${option.price}. In a real app, this would proceed to checkout.`);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="md:flex-shrink-0">
          <img
            className="h-48 w-full object-cover md:w-48"
            src={profile.imageUrl}
            alt={profile.name}
          />
        </div>
        <div className="p-4 sm:p-6 md:p-8 flex-1">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{profile.name}</h2>
              <p className="mt-1 text-gray-600">{profile.breed}</p>
            </div>
            <div className="w-24 h-24 bg-white p-2 rounded-lg shadow-sm">
              <QRCode
                value={window.location.href}
                size={88}
              />
            </div>
          </div>
          
          <p className="mt-4 text-gray-600">{profile.description}</p>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center">
              <Phone className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm sm:text-base">{profile.phoneNumber}</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="h-5 w-5 text-gray-400 mr-3" />
              <span className="text-sm sm:text-base">{profile.address}</span>
            </div>
            
            {profile.instagram && (
              <div className="flex items-center">
                <Instagram className="h-5 w-5 text-gray-400 mr-3" />
                <a
                  href={`https://instagram.com/${profile.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm sm:text-base"
                >
                  @{profile.instagram}
                </a>
              </div>
            )}

            <button
              onClick={() => setShowStickerOptions(!showStickerOptions)}
              className="w-full sm:w-auto flex items-center justify-center px-6 py-3 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Order QR Code Tag
            </button>
          </div>

          {showStickerOptions && (
            <div className="mt-6">
              <QRStickerOptions onSelect={handleStickerSelect} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}