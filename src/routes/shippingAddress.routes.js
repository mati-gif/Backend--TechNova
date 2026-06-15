import { Router } from "express";
import {verifyToken } from "../middleware/auth.js"
import { ShippingAddress } from "../models/ShippingAddress/ShippingAddress.js";
import { createShippingAddress, toggleShippingAddressStatus, getAllShippingAddresses, getShippingAddressById, getAllShippingAddressesByUserId } from "../services/shippingAddress.service.js";


const router = Router();

router.get("/shippingAddress/all",verifyToken,getAllShippingAddresses)
// router.get(`/shippingAddress/:id`,verifyToken,getShippingAddressById)
router.post("/shippingAddress/create/:userId",verifyToken,createShippingAddress)
router.get(`/shippingAddress/user/:userId`,verifyToken,getAllShippingAddressesByUserId)
router.put(`/shippingAddress/desactivate/:id`,verifyToken,toggleShippingAddressStatus)
router.put(`/shippingAddress/activate/:id`,verifyToken,toggleShippingAddressStatus)

export default router;
