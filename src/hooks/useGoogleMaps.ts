import { useEffect, useState } from 'react';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCduaDns37bbi4Vb5g73YFPVXU5r22x6b4';

let initialized = false;
let loadPromise: Promise<void> | null = null;

export const useGoogleMaps = () => {
  const [isLoaded, setIsLoaded] = useState(initialized);

  useEffect(() => {
    // If already initialized, return early
    if (initialized) {
      setIsLoaded(true);
      return;
    }

    // Create the loading promise if it doesn't exist
    if (!loadPromise) {
      loadPromise = new Promise<void>((resolve) => {
        // Create and append the script tag
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        
        // Handle script load event
        script.onload = () => {
          initialized = true;
          setIsLoaded(true);
          resolve();
        };
        
        // Handle script loading errors
        script.onerror = () => {
          console.error('Failed to load Google Maps API');
          document.head.removeChild(script);
          loadPromise = null;
        };

        document.head.appendChild(script);
      });
    }

    // Wait for the script to load
    loadPromise.then(() => {
      setIsLoaded(true);
    });
  }, []);

  return { isLoaded };
};