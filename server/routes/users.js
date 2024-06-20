import express from "express";

import{
    getUser,
    tokenNum,
    botLaunch,
    botStatus,
    botPrep,
    } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
/*
router.get("/:id", verifyToken, getUser);
router.get("/:id/tokens", verifyToken, tokenNum);
*/

/* UPDATE */
router.patch("/bot-prep", botPrep, verifyToken )
router.patch("/bot-launch", botLaunch,verifyToken)
router.post("/bot-status", botStatus,verifyToken)

export default router;