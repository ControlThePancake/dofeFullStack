import Stripe from "stripe";
const stripe = Stripe("sk_test_51Oq1gWJr7oV87jisVw1lfL5bsorVgd7t9YmOPxumOw0qSbZFMx6fGESB35zJapSiB2tEkJr8OeVc0R3P3wroJ53q00gmFT11uv")

const endpointSecret = "whsec_aa714adb711894f2cb66dcb8c0f67eefda399752d572d7eca8f4eb66d6e39a9f";

export const stripeThing = (request, response) => {
    const sig = request.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
      response.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntentSucceeded = event.data.object;
        console.log("Yes")
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a 200 response to acknowledge receipt of the event
    response.send();
  };
