import React, { useState, useCallback } from 'react';
import { DogProfile } from '../types/dog';
import { PawPrint } from 'lucide-react';
import { ImageUpload } from './ImageUpload';
import { useGoogleMaps } from '../hooks/useGoogleMaps';

interface DogFormProps {
  onSubmit: (profile: Omit<DogProfile, 'id'>) => void;
  initialData?: {
    ownerName: string;
    phoneNumber: string;
    address: string;
  };
}

export function DogForm({ onSubmit, initialData }: DogFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    breed: '',
    description: '',
    ownerName: initialData?.ownerName || '',
    phoneNumber: initialData?.phoneNumber || '',
    address: initialData?.address || '',
    instagram: '',
    imageUrl: '',
  });

  const { isLoaded } = useGoogleMaps();
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);

  const onPlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setFormData(prev => ({
          ...prev,
          address: place.formatted_address,
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleImageSelect = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      imageUrl
    }));
  };

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <ImageUpload onImageSelect={handleImageSelect} />

        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Dog's Name</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="breed" className="block text-sm font-medium text-gray-700">Breed</label>
          <input
            type="text"
            id="breed"
            name="breed"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.breed}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            required
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.description}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner's Name</label>
          <input
            type="text"
            id="ownerName"
            name="ownerName"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.ownerName}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">Phone Number</label>
          <input
            type="tel"
            id="phoneNumber"
            name="phoneNumber"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
          {isLoaded && (
            <div id="locationField">
              <input
                type="text"
                id="address"
                name="address"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                value={formData.address}
                onChange={handleChange}
                placeholder="Start typing your address..."
                ref={(input) => {
                  if (input && !autocomplete) {
                    const autocompleteInstance = new google.maps.places.Autocomplete(input);
                    autocompleteInstance.addListener('place_changed', onPlaceChanged);
                    setAutocomplete(autocompleteInstance);
                  }
                }}
              />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram (optional)</label>
          <input
            type="text"
            id="instagram"
            name="instagram"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.instagram}
            onChange={handleChange}
          />
        </div>
      </div>

      <button
        type="submit"
        className="flex items-center justify-center w-full px-4 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        <PawPrint className="w-5 h-5 mr-2" />
        Register Dog
      </button>
    </form>
  );
}