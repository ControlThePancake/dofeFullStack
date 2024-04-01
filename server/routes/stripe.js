import express from "express";
import { handleStripeWebhook } from "../controllers/stripe.js";

const router = express.Router();

router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    console.log("Incoming request:", req);
}, handleStripeWebhook);


  
export default router;