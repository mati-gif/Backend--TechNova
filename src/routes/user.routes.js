import { Router } from "express";
import { User } from "../models/User/User.js";
import { registerUser,loginUser } from "../services/user.service.js";
import { verifyToken } from "../middleware/auth.js";
import { retrieveAllUsers } from "../services/user.service.js";

const router = Router();

router.post("/register",registerUser)

router.post("/login",loginUser)

router.get("/user/all",verifyToken,retrieveAllUsers)
export default router;