import { DataTypes } from "sequelize";
import { sequelize } from "../../../db.js";


export const Order = sequelize.define("order", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderCode: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    subtotal: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    iva: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    shippingCost: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastFourDigits: {
        type: DataTypes.STRING(4),
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM("PENDIENTE", "COMPLETADA", "RECHAZADA"),
        allowNull: false,
        defaultValue: "PENDIENTE",
    },
    creationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    modificationDate: {
        type: DataTypes.DATE,
        allowNull: true,
    }
}, {
    timestamps: false // Con esto Sequelize crea automáticamente createdAt (fecha de compra)
});