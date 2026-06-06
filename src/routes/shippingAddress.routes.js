import { Router } from "express";
import {verifyToken } from "../middleware/auth.js"
import { ShippingAddress } from "../models/ShippingAddress/ShippingAddress.js";
import { createShippingAddress, deleteShippingAddress, getAllShippingAddresses, getShippingAddressById, getShippingAddressesByUserId } from "../services/shippingAddress.service.js";


const router = Router();

router.get("/shippingAddress/all",verifyToken,getAllShippingAddresses)
router.get(`/shippingAddress/:id`,verifyToken,getShippingAddressById)
router.post("/shippingAddress/create/:userId",verifyToken,createShippingAddress)
router.get(`/shippingAddress/user/:userId`,verifyToken,getShippingAddressesByUserId)
router.put(`/shippingAddress/delete/:id`,verifyToken,deleteShippingAddress)
export default router;
