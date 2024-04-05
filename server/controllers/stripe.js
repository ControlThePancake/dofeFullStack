import Stripe from "stripe";
import dotenv from "dotenv";
import User from "../models/User.js"
import jwt from "jsonwebtoken";
dotenv.config();
const stripe = Stripe(`${process.env.STRIPE_KEY}`)
const endpointSecret = `${process.env.ENDPOINT_SECRET}`;


export const stripeThing = async (req, res) => {
    const sig = req.headers['stripe-signature'];
  
    let event;
  
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }

   

    const fulfillOrder = async (lineItems,clientId,customerEmail) => {
      lineItems.data.forEach(item => {
        console.log(`Fulfilling order item: Product ID: ${item.price.product.id}, Description: ${item.description}`);
      });
      let tokens = 0
      switch(item.price.prodcut.id){

        case 'prod_Ph9YhrDw5o06oD':
          tokens = 250
        break;

        case 'prod_Ph9V9lZOWhTDoC':
          tokens = 120
        break;

        case 'prod_Ph9ROQoAjeAxUg':
          tokens = 60
        break;

        case 'prod_Ph9NZrO0xCRl1P':
          tokens = 25
        break;

      }

      
      let user = await User.findById(clientId);
      if (!user){
        console.log("user not found, using email")
        user = await User.findOne({email : customerEmail})
      }
      try{
        let tokenNum = user ? user.tokenNum : null;
          tokenNum += tokens;
          user.tokenNum = tokenNum;
          await user.save();
          const token = jwt.sign({id: _id}, process.env.JWT_SECRET);
          res.status(200).json({token,user});
      } catch (err) {
        console.log("user not found")
        res.status(500).json({ message: err.message});
      }
    };


    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        console.log("Order completed");
        const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
          event.data.object.id,
          {
            expand: ['line_items', 'line_items.data.price.product'], // Expand to include product details 
          }
        );
        
        

        const lineItems = sessionWithLineItems.line_items;
        const clientId = sessionWithLineItems.client_reference_id;
        const customerEmail = session.customer_email; // Email address is directly available
        console.log(`Customer email: ${customerEmail}`);
        console.log(`Client Reference ID: ${clientId}`);

        fulfillOrder(lineItems,clientId,customerEmail);

      break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).send();
};
