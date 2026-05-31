import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { Category } from "../models/Category/Category.js";
import { retrieveAllCategories } from "../services/category.service.js";

const router = Router();


router.get("/category/all",verifyToken,retrieveAllCategories)

export default router;