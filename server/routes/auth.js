import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", login, verifyToken);
router.post("/register", register, verifyToken); // Add this line for registration


export default router;

