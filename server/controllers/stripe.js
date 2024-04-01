import stripe from 'stripe'; // Assuming you've set up Stripe
const stripeInstance = stripe(process.env.STRIPE_KEY); // Replace with your Stripe secret key
const endpointSecret = process.env.STRIPE_SECRET; // Replace with your endpoint's secret
import User from '../models/User.js';
import bodyParser from 'body-parser';

export const giveToken = () =>{

}

export const handleStripeWebhook = async (request, response) => {
    const sig = request.headers['stripe-signature'];
    const fullFill = (lineItems) =>{
        console.log("lineItems", lineItems)
    }
  
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(request.body, sig, endpointSecret);
    } catch (err) {
        response.status(400).send(`Webhook Error: ${err.message}`);
        return;
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const checkoutSessionCompleted = event.data.object;
            console.log(`Checkout session completed: ${checkoutSessionCompleted.id}`);
            const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
                event.data.object.id,
                {
                  expand: ['line_items'],
                }
              );
              const lineItems = sessionWithLineItems.line_items;
                fullFill(lineItems);
            break;
        // ... handle other event types
        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    response.json({received: true});
};
