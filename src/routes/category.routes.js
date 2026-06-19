import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { Category } from "../models/Category/Category.js";
import { retrieveAllCategories } from "../services/category.service.js";

const router = Router();

router.get("/category/all", retrieveAllCategories);

export default router;
