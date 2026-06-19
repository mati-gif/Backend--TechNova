import { OrderProduct } from "../models/OrderProduct/OrderProduct.js";
import { Product } from "../models/Product/Product.js";
import { Order } from "../models/Order/Order.js";

// 1. Crear un registro en OrderProduct
export const createOrderProduct = async (req, res) => {
  try {
    const { orderId, productId, quantity, priceAtPurchase } = req.body;

    if (quantity <= 0) {
      return res.status(404).json({
        message:
          "La cantidad es menor o igual a 0, ingrese una cantidad válida",
      });
    }

    if (priceAtPurchase < 0) {
      return res
        .status(404)
        .json({ message: "El precio no puede ser menor a 0" });
    }
    // Validar que la orden exista
    const order = await Order.findByPk(orderId);
    if (!order) return res.status(404).json({ message: "Orden no encontrada" });

    // Validar que el producto exista
    const product = await Product.findByPk(productId);
    if (!product)
      return res.status(404).json({ message: "Producto no encontrado" });

    if (product.stock < quantity) {
      return res.status(400).json({
        message: "Stock insuficiente",
      });
    }

    // Crear la relación
    const newOrderProduct = await OrderProduct.create({
      orderId,
      productId,
      quantity,
      priceAtPurchase,
    });

    await product.update({
      stock: product.stock - quantity,
    });

    res.status(201).json({
      message: "¡Producto añadido a la orden con éxito!",
      orderProduct: newOrderProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al añadir producto a la orden: " + error.message,
    });
  }
};

// 2. Traer todos los registros (OrderProducts)
export const getAllOrderProducts = async (req, res) => {
  try {
    // Incluimos información de la orden y del producto para que sea útil
    const orderProducts = await OrderProduct.findAll({
      include: [Order, Product],
    });
    if (!orderProducts || orderProducts.length === 0) {
      return res.status(404).json({ message: "No hay productos en ordenes" });
    }
    res.status(200).json(orderProducts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 3. Traer por ID
export const getOrderProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const orderProduct = await OrderProduct.findByPk(id, {
      include: [Order, Product],
    });

    if (!orderProduct || orderProducts.length === 0) {
      return res.status(404).json({ message: "Registro no encontrado" });
    }

    res.status(200).json(orderProduct);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
