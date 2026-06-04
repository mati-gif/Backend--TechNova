import { Router } from "express";
import {verifyToken } from "../middleware/auth.js"
import { Order } from "../models/Order/Order.js";
import { createOrder, getAllOrders, getOrderById, getOrdersByUserId } from "../services/order.service.js";

const router = Router();

router.get("/order/all",verifyToken,getAllOrders)
router.get(`/order/:id`,verifyToken,getOrderById)
router.post("/order/create",verifyToken,createOrder)
router.get(`/order/user/:userId`,verifyToken,getOrdersByUserId)
export default router;