import { Router } from "express";
import { User } from "../models/User/User.js";
import {
  registerUser,
  loginUser,
  deleteUser,
  changeUserRole,
  changeUserPassword,
  findUserById,
} from "../services/user.service.js";
import { verifySuperAdmin, verifyToken } from "../middleware/auth.js";
import { retrieveAllUsers } from "../services/user.service.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/user/all", verifyToken, retrieveAllUsers);
router.put(`/delete/user/:id`, verifyToken, verifySuperAdmin, deleteUser);
router.put(`/change/role/:id`, verifyToken, verifySuperAdmin, changeUserRole);
router.put(
  `/change/password/:id`,
  verifyToken,
  verifySuperAdmin,
  changeUserPassword,
);
router.get(`/user/:id`, verifyToken, findUserById);

export default router;
