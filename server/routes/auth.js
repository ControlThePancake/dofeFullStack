import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register); // Add this line for registration

export default router;

