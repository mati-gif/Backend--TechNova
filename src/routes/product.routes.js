import { Router } from "express";
import { Product } from "../models/Product/Product.js";
import {retrieveAllProducts,findById,createNewProduct} from "../services/product.service.js"
import {verifyToken } from "../middleware/auth.js"

const router = Router();


router.get("/product/all",verifyToken,retrieveAllProducts)
router.get(`/product/:id`,verifyToken,findById)
router.post("/create",verifyToken,createNewProduct)

export default router;