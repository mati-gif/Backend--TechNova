import { Router } from "express";
import { createContact, getContacts, getContactsGrouped } from "../controllers/contact.controller.js";
import { verifyToken, verifyAdminOrSuperAdmin } from "../middleware/auth.js";

const router = Router();

router.post("/contact-us", createContact);
router.get("/contact-us", verifyToken, verifyAdminOrSuperAdmin, getContacts);
router.get("/contact-us/grouped", verifyToken, verifyAdminOrSuperAdmin, getContactsGrouped);
router.get("/contact-us/all", verifyToken, verifyAdminOrSuperAdmin, getContactsGrouped);

router.get("/admin/contact-us", verifyToken, verifyAdminOrSuperAdmin, getContacts);
router.get("/admin/contact-us/grouped", verifyToken, verifyAdminOrSuperAdmin, getContactsGrouped);
router.get("/admin/contact-us/all", verifyToken, verifyAdminOrSuperAdmin, getContactsGrouped);

export default router;