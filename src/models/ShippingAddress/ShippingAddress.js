import { DataTypes } from "sequelize";
import { sequelize } from "../../../db.js";


export const ShippingAddress = sequelize.define("shippingAddress", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    province: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    zipCode: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: false,
    },    
    active:{
        type:DataTypes.BOOLEAN,
        defaultValue:true
    }
}, {
    timestamps: false
});