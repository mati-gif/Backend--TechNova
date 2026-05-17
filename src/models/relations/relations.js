import { Role } from "../Role/Role.js";
import { User } from "../User/User.js";
import { Order } from "../Order/Order.js";
import { OrderProduct } from "../OrderProduct/OrderProduct.js";
import { Product } from "../Product/Product.js";
import { ShippingAddress } from "../ShippingAddress/ShippingAddress.js";

// 1. Relación: Roles y Usuarios (1 a N)
// ==========================================
Role.hasMany(User, { foreignKey: 'roleId' });
User.belongsTo(Role, { foreignKey: 'roleId' });


// ==========================================
// 2. Relación: Usuarios y Órdenes (1 a N)
// ==========================================
User.hasMany(Order, { foreignKey: 'userId' });
Order.belongsTo(User, { foreignKey: 'userId' });

// ==========================================
// 3. Relación: Órdenes y Dirección de Envío (1 a 1)
// ==========================================
Order.hasOne(ShippingAddress, { foreignKey: 'orderId' });
ShippingAddress.belongsTo(Order, { foreignKey: 'orderId' });

// ==========================================
// 4. Relación: Órdenes y Productos (N a N)
// ==========================================
Order.belongsToMany(Product, { through: OrderProduct, foreignKey: 'orderId' });
Product.belongsToMany(Order, { through: OrderProduct, foreignKey: 'productId' });

// 3. Exportamos los modelos ya relacionados por si los necesitás
export { Role, User, Product, Order, ShippingAddress, OrderProduct };