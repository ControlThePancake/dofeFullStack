import stripe from 'stripe'; // Assuming you've set up Stripe
const stripeInstance = stripe(process.env.STRIPE_KEY); // Replace with your Stripe secret key
const endpointSecret = process.env.STRIPE_SECRET; // Replace with your endpoint's secret
import User from '../models/User.js';
import bodyParser from 'body-parser';

export const giveToken = () =>{

}

export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    console.log(sig)
    const fullFill = (lineItems) =>{
        console.log("lineItems", lineItems)
    }
  
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}, cheeseburger`);
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

        case 'payment_intent.succeeded':
            const paymentIntentSucceeded = event.data.object;
            console.log(`Cheessssburger 2: ${paymentIntentSucceeded.id}`)

            break;

        default:
            console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status({received: true});
};
