import React, { useState, useCallback } from 'react';
import { UserProfile } from '../types/user';
import { Mail, User, Phone, MapPin } from 'lucide-react';
import { useGoogleMaps } from '../hooks/useGoogleMaps';

interface UserRegistrationProps {
  onSubmit: (profile: Omit<UserProfile, 'id'>) => void;
}

export function UserRegistration({ onSubmit }: UserRegistrationProps) {
  const [formData, setFormData] = useState({
    email: '',
    fullName: '',
    phoneNumber: '',
    address: '',
  });

  const { isLoaded } = useGoogleMaps();
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete | null>(null);
  const [isAddressSelected, setIsAddressSelected] = useState(false);

  const onPlaceChanged = useCallback(() => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        setFormData(prev => ({
          ...prev,
          address: place.formatted_address
        }));
        setIsAddressSelected(true);
      }
    }
  }, [autocomplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isAddressSelected || !formData.address) {
      onSubmit(formData);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'address') {
      setIsAddressSelected(false);
    }
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressSelect = useCallback((input: HTMLInputElement | null) => {
    if (input && !autocomplete && isLoaded) {
      const autocompleteInstance = new google.maps.places.Autocomplete(input, {
        fields: ['formatted_address'],
        types: ['address']
      });
      autocompleteInstance.addListener('place_changed', () => {
        const place = autocompleteInstance.getPlace();
        if (place.formatted_address) {
          setFormData(prev => ({
            ...prev,
            address: place.formatted_address
          }));
          setIsAddressSelected(true);
        }
      });
      setAutocomplete(autocompleteInstance);
    }
  }, [isLoaded]);

  if (!isLoaded) {
    return <div>Loading...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white rounded-lg">
        <div className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
              Full Name
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="fullName"
                name="fullName"
                required
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
              Phone Number
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                className="pl-10 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                value={formData.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700">
              Address
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                id="address"
                name="address"
                required
                className={`pl-10 block w-full rounded-md border-gray-300 focus:border-blue-500 focus:ring-blue-500 ${
                  !isAddressSelected && formData.address ? 'border-yellow-300' : ''
                }`}
                value={formData.address}
                onChange={handleChange}
                placeholder="Start typing your address..."
                ref={handleAddressSelect}
                autoComplete="off"
              />
              {!isAddressSelected && formData.address && (
                <p className="mt-1 text-sm text-yellow-600">
                  Please select an address from the suggestions
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!isAddressSelected && formData.address}
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Continue
      </button>
    </form>
  );
}