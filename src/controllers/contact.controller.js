import { ContactForm } from "../models/ContactForm/ContactForm.js";

export const createContact = async (req, res) => {
  try {
    const { fullname, email, message } = req.body;

    if (!email || !message) {
      return res.status(400).json({ message: "Email and message are required." });
    }

    const contact = await ContactForm.create({ fullname, email, message });

    return res.status(201).json({ message: "Contact saved", contact });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default createContact;
