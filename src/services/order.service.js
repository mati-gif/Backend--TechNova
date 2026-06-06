import { Order } from "../models/Order/Order.js";
import { User } from "../models/User/User.js";
import { ShippingAddress } from "../models/ShippingAddress/ShippingAddress.js";
import { Product } from "../models/Product/Product.js";
import { OrderProduct } from "../models/OrderProduct/OrderProduct.js";


// 1. Crear una orden
export const createOrder = async (req, res) => {
    try {
        const { userId, shippingAddressId, ...orderData } = req.body;

        // Validar usuario activo
        const user = await User.findOne(
            {
                where:
                    { id: userId, active: true }
            });
        if (!user) return res.status(404).json({ message: "Usuario no encontrado o inactivo" });

        // Validar existencia de dirección
        const address = await ShippingAddress.findByPk(shippingAddressId);
        if (!address) return res.status(404).json({ message: "Dirección no válida" });


        const lastOrder = await Order.findOne({
            order: [["id", "DESC"]]
        });

        const nextNumber = lastOrder ? lastOrder.id + 1 : 1;

        const orderCode =
            `TN-${new Date().getFullYear()}-${String(nextNumber).padStart(3, "0")}`;

        const newOrder = await Order.create({
            userId,
            shippingAddressId,
            orderCode,
            creationDate: new Date(),
            modificationDate: new Date(),
            ...orderData
        });

        res.status(201).json({ message: "Orden creada con éxito", order: newOrder });
    } catch (error) {
        res.status(500).json({ message: "Error al crear la orden: " + error.message });
    }
};

// 2. Traer todas las órdenes (solo de usuarios activos)
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.findAll(
            {
                include: [{
                    model: User,
                    attributes: ['id', 'active', 'name', 'email'],
                    where: { active: true } // Si el usuario no está activo, la consulta fallará o no traerá nada
                }]
            });
        if (!orders) {
            return res.status(404).json({ message: "No se encontraron pedidos " })
        }
        res.status(200).json({ message: "Listado de pedidos para usuarios activos", orders });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// 3. Traer órdenes por userId (solo si el usuario está activo)
export const getOrdersByUserId = async (req, res) => {
    try {

        const { userId } = req.params;

        const orders = await Order.findAll({
            where: { userId },

            include: [
                {
                    model: User,
                    attributes: ["id", "name", "email"]
                },
                {
                    model: ShippingAddress
                },
                {
                    model: Product,
                    through: {
                        attributes: [
                            "quantity",
                            "priceAtPurchase"
                        ]
                    }
                }
            ]
        });

        res.status(200).json({
            orders
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};

// 4. Traer orden por ID
export const getOrderById = async (req, res) => {
    try {
        const { id } = req.params;
        const order = await Order.findByPk(id, {
            include: [{
                model: User,
                attributes: ['id', 'active', 'name', 'email'],
                where: { active: true } // Si el usuario no está activo, la consulta fallará o no traerá nada
            }]

        });

        if (!order || {}) return res.status(404).json({ message: "Orden no encontrada o usuario inactivo" });

        res.status(200).json({ message: "La orden encontrada es ", order });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
