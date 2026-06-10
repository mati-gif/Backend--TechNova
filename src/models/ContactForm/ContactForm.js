import { DataTypes } from "sequelize";
import { sequelize } from "../../../db.js";


export const ContactForm = sequelize.define("ContactForm", {
    id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    fullname: { 
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    tableName: "contact_forms",
    freezeTableName: true,
    timestamps: true
});