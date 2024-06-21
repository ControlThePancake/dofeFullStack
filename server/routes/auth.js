import express from "express";
import { login, register } from "../controllers/auth.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//End points for authentication
router.post("/login", login, verifyToken);
router.post("/register", register, verifyToken);


export default router;

