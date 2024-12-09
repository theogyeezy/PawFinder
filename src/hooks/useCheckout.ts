import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { createUserProfile } from '../services/userService';
import { createDogProfile } from '../services/dogService';
import { emailService } from '../services/emailService';
import { generateQRCode } from '../services/qrCodeService';
import { UserProfile } from '../types/user';
import { DogProfile } from '../types/dog';

interface CheckoutHookResult {
  handleCheckoutSuccess: (userProfile: UserProfile, dogProfile: Omit<DogProfile, 'id'>) => Promise<void>;
  isProcessing: boolean;
  error: string | null;
}

export const useCheckout = (): CheckoutHookResult => {
  const { currentUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCheckoutSuccess = async (
    userProfile: UserProfile,
    dogProfile: Omit<DogProfile, 'id'>
  ) => {
    if (!currentUser) {
      setError('User must be logged in to complete checkout');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Create user profile
      await createUserProfile(currentUser.uid, userProfile);

      // Create dog profile
      const dogId = await createDogProfile({
        ...dogProfile,
        ownerId: currentUser.uid
      });

      // Generate QR code
      const qrCodeUrl = await generateQRCode(dogId);

      // Send welcome email
      await emailService.sendWelcomeEmail({
        to: userProfile.email,
        name: userProfile.fullName,
        dogName: dogProfile.name,
        qrCodeUrl
      });

    } catch (err) {
      console.error('Checkout error:', err);
      setError('An error occurred during checkout. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    handleCheckoutSuccess,
    isProcessing,
    error
  };
};