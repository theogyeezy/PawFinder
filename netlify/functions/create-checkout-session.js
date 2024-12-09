const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' }) 
    };
  }

  try {
    const { items, successUrl, cancelUrl, customerEmail } = JSON.parse(event.body);

    // Create line items for the checkout session
    const lineItems = items.map(item => {
      if (item.type === 'subscription') {
        return {
          price: item.id === 'monthly' 
            ? 'price_1QTE5pDeHbm9zTfaLXAlNrk1' // Monthly price ID
            : 'price_1QTE5pDeHbm9zTfaLXAlNrk2', // Annual price ID
          quantity: 1,
        };
      } else if (item.type === 'welcome_package') {
        return {
          price_data: {
            currency: 'usd',
            product: 'prod_RLwDsEyw5miuCg', // Welcome package product ID
            unit_amount: 0, // Free for new users
            product_data: {
              name: 'New User Welcome Package',
              description: 'Includes Basic QR Tag and Premium Metal Tag'
            }
          },
          quantity: 1,
        };
      }
      return null;
    }).filter(Boolean);

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: items.some(item => item.type === 'subscription') ? 'subscription' : 'payment',
      line_items: lineItems,
      success_url: successUrl,
      cancel_url: cancelUrl,
      customer_email: customerEmail,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'],
      },
      metadata: {
        source: 'PawFinder QR',
      },
    });

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ sessionId: session.id })
    };
  } catch (error) {
    console.error('Stripe session creation error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        error: error.message || 'Failed to create checkout session' 
      })
    };
  }
};