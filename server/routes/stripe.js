import express from "express";
import { handleStripeWebhook } from "../controllers/stripe.js";

const router = express.Router();

router.patch('/webhook',express.raw({type: 'application/json'}), handleStripeWebhook);


  
export default router;