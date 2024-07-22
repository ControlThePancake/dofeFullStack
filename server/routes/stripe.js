import express from "express";
import {stripeThing, checkoutAuth} from "../controllers/stripe.js"

const router = express.Router();

//Stripe endpoint 

router.post ("/checkoutAuth", express.raw({type: 'application/json'}), checkoutAuth);
router.post('/webhook', express.raw({type: 'application/json'}), stripeThing);

export default router;