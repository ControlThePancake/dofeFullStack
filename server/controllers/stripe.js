import express from "express";
import stripe from "stripe";
const stripeInstance = stripe("sk_test_51Oq1gWJr7oV87jisVw1lfL5bsorVgd7t9YmOPxumOw0qSbZFMx6fGESB35zJapSiB2tEkJr8OeVc0R3P3wroJ53q00gmFT11uv")
const endpointSecret = "whsec_aa714adb711894f2cb66dcb8c0f67eefda399752d572d7eca8f4eb66d6e39a9f"; // Replace with your endpoint's secret
import User from '../models/User.js';

export const giveToken = () =>{

}

export const handleStripeWebhook = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    console.log("cheesburger")
    console.log(typeof req.body); // Should log 'object' if it's a Buffer
    console.log(req.headers['stripe-signature']);
    const fullFill = (lineItems) =>{
        console.log("lineItems", lineItems)
    }
  
    let event;

    try {
        event = stripeInstance.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        res.status(400).send(`Webhook Error: ${err.message}`);
        console.log("cheesburger 1")
        console.log(err)
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
