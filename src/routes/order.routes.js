import { Router } from "express";
import { verifyToken } from "../middleware/auth.js";
import { Order } from "../models/Order/Order.js";
import {
  createOrder,
  getAllOrders,
  getOrderById,
  getOrdersByUserId,
  getOrdersHistoryByUserId,
} from "../services/order.service.js";

const router = Router();

router.get("/order/all", verifyToken, getAllOrders);
router.get(`/order/:id`, verifyToken, getOrderById);
router.post("/order/create", verifyToken, createOrder);
router.get(`/order/user/:userId`, verifyToken, getOrdersByUserId);
router.get(`/order/history/:userId`, verifyToken, getOrdersHistoryByUserId);

export default router;
