import { ContactForm } from "../models/ContactForm/ContactForm.js";

export const createContact = async (req, res) => {
    try {
        const { fullname, email, message } = req.body;

        if (!email || !message) {
            return res.status(400).json({ message: "Email y mensaje son requeridos" });
        }

        const contact = await ContactForm.create({ fullname, email, message });

        return res.status(201).json({ message: "Contacto guardado", contact });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getContacts = async (req, res) => {
    try {
        const contacts = await ContactForm.findAll({
            order: [["createdAt", "DESC"]],
        });

        return res.status(200).json(contacts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export const getContactsGrouped = async (req, res) => {
    try {
        const contacts = await ContactForm.findAll({
            order: [["createdAt", "DESC"]],
            raw: true,
        });

        const grouped = contacts.reduce((acc, contact) => {
            const key = contact.email;
            if (!acc[key]) {
                acc[key] = {
                    email: contact.email,
                    fullname: contact.fullname,
                    totalMessages: 0,
                    latestMessageAt: contact.createdAt,
                    messages: [],
                };
            }

            acc[key].totalMessages += 1;
            if (new Date(contact.createdAt) > new Date(acc[key].latestMessageAt)) {
                acc[key].latestMessageAt = contact.createdAt;
            }
            acc[key].messages.push({
                id: contact.id,
                fullname: contact.fullname,
                message: contact.message,
                createdAt: contact.createdAt,
            });

            return acc;
        }, {});

        const groupedContacts = Object.values(grouped).sort((a, b) => {
            return new Date(b.latestMessageAt) - new Date(a.latestMessageAt);
        });

        return res.status(200).json(groupedContacts);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};

export default createContact;