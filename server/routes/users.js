import express from "express";

import{
    getUser,
    tokenNum,
    updateTokenNum,
    botLaunch,
    } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
/*
router.get("/:id", verifyToken, getUser);
router.get("/:id/tokens", verifyToken, tokenNum);
*/

/* UPDATE */
router.patch("/input",updateTokenNum, verifyToken )
router.patch("/botLaunch",botLaunch )

export default router;