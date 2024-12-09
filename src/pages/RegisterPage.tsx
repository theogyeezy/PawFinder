import React from 'react';
import { DogForm } from '../components/DogForm';
import { DogProfile } from '../components/DogProfile';
import { UserRegistration } from '../components/UserRegistration';
import { SubscriptionPlanSelector } from '../components/SubscriptionPlanSelector';
import { QRStickerOptions } from '../components/QRStickerOptions';
import { DogProfile as DogProfileType } from '../types/dog';
import { UserProfile } from '../types/user';
import { BackButton } from '../components/BackButton';
import { createCheckoutSession } from '../services/stripeService';
import { useCart } from '../contexts/CartContext';

type RegistrationStep = 'user' | 'dog' | 'plan' | 'welcome-package' | 'complete';

export function RegisterPage() {
  const [step, setStep] = React.useState<RegistrationStep>('user');
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  const [profiles, setProfiles] = React.useState<DogProfileType[]>([]);
  const { state: cartState } = useCart();

  const handleUserSubmit = (profile: Omit<UserProfile, 'id'>) => {
    setUserProfile({
      ...profile,
      id: crypto.randomUUID(),
    });
    setStep('dog');
  };

  const handleDogSubmit = (profileData: Omit<DogProfileType, 'id'>) => {
    const newProfile: DogProfileType = {
      ...profileData,
      id: crypto.randomUUID(),
    };
    setProfiles(prev => [...prev, newProfile]);
    setStep('plan');
  };

  const handlePlanSelect = () => {
    setStep('welcome-package');
  };

  const handleWelcomePackageSelect = async () => {
    if (!userProfile) return;

    try {
      await createCheckoutSession({
        successUrl: '/checkout/success',
        cancelUrl: '/register',
        customerEmail: userProfile.email,
        items: cartState.items
      });
    } catch (error) {
      console.error('Checkout error:', error);
    }
  };

  const handleBack = () => {
    switch (step) {
      case 'dog':
        setStep('user');
        break;
      case 'plan':
        setStep('dog');
        break;
      case 'welcome-package':
        setStep('plan');
        break;
      case 'complete':
        setStep('welcome-package');
        break;
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div className="mb-6">
        <BackButton onClick={handleBack} />
      </div>

      {step === 'user' && (
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Create Your Account</h3>
              <p className="mt-1 text-sm text-gray-600">
                Please provide your information to set up your PawFinder account.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <UserRegistration onSubmit={handleUserSubmit} />
            </div>
          </div>
        </div>
      )}

      {step === 'dog' && userProfile && (
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Register Your Dog</h3>
              <p className="mt-1 text-sm text-gray-600">
                Create a QR code profile for your dog that can be used to help locate them if they ever get lost.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <DogForm 
                onSubmit={handleDogSubmit}
                initialData={{
                  ownerName: userProfile.fullName,
                  phoneNumber: userProfile.phoneNumber,
                  address: userProfile.address
                }}
              />
            </div>
          </div>
        </div>
      )}

      {step === 'plan' && (
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Choose Your Plan</h3>
              <p className="mt-1 text-sm text-gray-600">
                Select a protection plan that best fits your needs.
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <SubscriptionPlanSelector onSelect={handlePlanSelect} />
            </div>
          </div>
        </div>
      )}

      {step === 'welcome-package' && (
        <div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:p-6">
          <div className="md:grid md:grid-cols-3 md:gap-6">
            <div className="md:col-span-1">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Get Your Welcome Package</h3>
              <p className="mt-1 text-sm text-gray-600">
                As a new user, you'll receive our welcome package with your first tags completely free!
              </p>
            </div>
            <div className="mt-5 md:col-span-2 md:mt-0">
              <QRStickerOptions onSelect={handleWelcomePackageSelect} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}