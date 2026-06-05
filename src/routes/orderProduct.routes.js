import { Router } from "express";
import {verifyToken } from "../middleware/auth.js"
import { OrderProduct } from "../models/OrderProduct/OrderProduct.js";
import { createOrderProduct, getAllOrderProducts, getOrderProductById } from "../services/orderProduct.service.js";


const router = Router();

router.get("/order/product/all",verifyToken,getAllOrderProducts)
router.get(`/order/product/:id`,verifyToken,getOrderProductById)
router.post("/order/product/create",verifyToken,createOrderProduct)
export default router;