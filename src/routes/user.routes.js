import { Router } from "express";
import { User } from "../models/User/User.js";
import { registerUser,loginUser } from "../services/user.service.js";

const router = Router();

router.post("/register",registerUser)

router.post("/login",loginUser)
export default router;