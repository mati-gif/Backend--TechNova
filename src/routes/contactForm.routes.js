import { Router } from "express";
import {
  createContact,
  getContacts,
  getContactsGrouped,
} from "../services/contactForm.service.js";
import { verifyToken, verifyAdminOrSuperAdmin } from "../middleware/auth.js";
import { ContactForm } from "../models/ContactForm/ContactForm.js";

const router = Router();

router.post("/contact-us", createContact);
router.get("/contact-us", verifyToken, verifyAdminOrSuperAdmin, getContacts);
router.get(
  "/contact-us/grouped",
  verifyToken,
  verifyAdminOrSuperAdmin,
  getContactsGrouped,
);
router.get(
  "/contact-us/all",
  verifyToken,
  verifyAdminOrSuperAdmin,
  getContactsGrouped,
);

router.get(
  "/admin/contact-us",
  verifyToken,
  verifyAdminOrSuperAdmin,
  getContacts,
);
router.get(
  "/admin/contact-us/grouped",
  verifyToken,
  verifyAdminOrSuperAdmin,
  getContactsGrouped,
);
router.get(
  "/admin/contact-us/all",
  verifyToken,
  verifyAdminOrSuperAdmin,
  getContactsGrouped,
);

export default router;
