import express from "express";
import { handleStripeWebhook } from "../controllers/stripe.js";

const router = express.Router();

router.post('/webhook/webhook', express.raw({type: 'application/json'}), (req, res, next) => {
    console.log("Incoming request:", req);
    next(); // Call next middleware
}, handleStripeWebhook);



export default router;