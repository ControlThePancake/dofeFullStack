import express from "express";

import{ 
    botLaunch,
} from "../controllers/botLaunch.js"

const router = express.Router();

router.post("/botLaunch", botLaunch)


export default router;