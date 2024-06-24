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
*/
router.get("/tokens/:id", verifyToken, tokenNum);


//User and bot endpoint
/* UPDATE */
router.patch("/bot-prep", verifyToken, botPrep );
router.post("/bot-launch", verifyToken, botLaunch);
router.get("/bot-status", verifyToken, botStatus);

export default router;