import express from "express";

import{ 
    botLaunch,
} from "../controllers/botLaunch.js"

const router = express.Router();

router.patch("/botLaunch", botLaunch)


export default router;