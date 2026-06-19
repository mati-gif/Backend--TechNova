import { Role } from "../Role/Role.js";
import { User } from "../User/User.js";
import { Order } from "../Order/Order.js";
import { OrderProduct } from "../OrderProduct/OrderProduct.js";
import { Product } from "../Product/Product.js";
import { ShippingAddress } from "../ShippingAddress/ShippingAddress.js";
import { Category } from "../Category/Category.js";
import { ContactForm } from "../ContactForm/ContactForm.js";

// 1. Relación: Roles y Usuarios (1 a N)
// ==========================================
Role.hasMany(User, { foreignKey: "roleId" });
User.belongsTo(Role, { foreignKey: "roleId" });

// ==========================================
// 2. Relación: Usuarios y Órdenes (1 a N)
// ==========================================
User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

// ==========================================
// 3. Relación:  Dirección de Envío y Órdenes (1 a N)
// ==========================================
ShippingAddress.hasMany(Order, { foreignKey: "shippingAddressId" });
Order.belongsTo(ShippingAddress, { foreignKey: "shippingAddressId" });

// ==========================================
// 4. Relación:  Usuario y Ordenes de envio (1 a N)
// ==========================================
User.hasMany(ShippingAddress, { foreignKey: "userId" });
ShippingAddress.belongsTo(User, { foreignKey: "userId" });

// ==========================================
// 5. Relación: Órdenes y Productos (N a N)
// ==========================================
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: "orderId" });
Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "productId",
});

// ==========================================
// 6. Relación: Categoria y Productos (1 a N)
// ==========================================
// 1. Una categoría tiene muchos productos
Category.hasMany(Product, {
  foreignKey: "categoryId", // Sequelize creará automáticamente 'categoryId' en la tabla Products
});

// 2. Un producto pertenece a una categoría
Product.belongsTo(Category, {
  foreignKey: "categoryId",
});

// 3. Exportamos los modelos ya relacionados por si los necesitás
export { Role, User, Product, Order, ShippingAddress, OrderProduct, Category };
