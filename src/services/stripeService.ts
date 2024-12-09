import { loadStripe } from '@stripe/stripe-js';

const STRIPE_PUBLIC_KEY = 'pk_test_51QTE5pDeHbm9zTfaLXAlNrk1swkfc2o10qyTUNhzPzkDevWwV14epT0qhXGHjuKEgRN7WEAdvaqCqhJMOBDmsiai00GvGqtrnz';
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

interface CreateCheckoutSessionParams {
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    type: 'subscription' | 'welcome_package';
  }>;
}

export const createCheckoutSession = async ({
  successUrl,
  cancelUrl,
  customerEmail,
  items
}: CreateCheckoutSessionParams): Promise<void> => {
  const stripe = await stripePromise;
  if (!stripe) throw new Error('Stripe failed to initialize');

  try {
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items,
        successUrl: `${window.location.origin}${successUrl}`,
        cancelUrl: `${window.location.origin}${cancelUrl}`,
        customerEmail,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Failed to create checkout session');
    }

    const { error } = await stripe.redirectToCheckout({
      sessionId: data.sessionId
    });

    if (error) {
      throw error;
    }
  } catch (error) {
    console.error('Checkout error:', error);
    throw error;
  }
};