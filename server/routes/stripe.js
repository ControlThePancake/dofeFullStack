import express from "express";
import {stripeThing} from "../controllers/stripe.js"

const router = express.Router();

//Stripe endpoint 
router.post('/webhook', express.raw({type: 'application/json'}), stripeThing)

export default router;