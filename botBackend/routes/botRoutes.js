// Importing modules and stuff from other files
import express from "express";

import{ 
    botLaunch,
} from "../controllers/botLaunch.js"

//import { verifyToken } from "../middleware/tokenAuth.js";

const router = express.Router();

//End point for bot launches
router.patch("/botLaunch", botLaunch)


export default router;