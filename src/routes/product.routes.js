import { Router } from "express";
import { Product } from "../models/Product/Product.js";
import {retrieveAllProducts,findById,createNewProduct, updateProduct, deleteAProduct} from "../services/product.service.js"
import {verifyToken } from "../middleware/auth.js"

const router = Router();


router.get("/product/all",retrieveAllProducts)
router.get(`/product/:id`,findById)
router.post("/create",verifyToken,createNewProduct)
router.put(`/update/:id`,verifyToken,updateProduct)
router.put(`/delete/:id`,verifyToken,deleteAProduct)

export default router;