import express from "express";

import{
    getUser,
    getTokens,
    addRemoveTokens,
    } from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/:id", verifyToken, getUser);
router.get("/:id/tokens", verifyToken, getTokens);

/* UPDATE */
router.patch("/:id/:tokens", verifyToken, addRemoveTokens)

export default router;