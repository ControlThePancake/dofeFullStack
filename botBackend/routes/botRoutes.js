import express from "express";

import{ 
    botLaunch,
} from "../controllers/botLaunch.js"

import { verifyToken } from "../middleware/tokenAuth.js";

const router = express.Router();

router.patch("/botLaunch", botLaunch, verifyToken)


export default router;