import { DataTypes } from "sequelize";
import { sequelize } from "../../../db.js"; // Tu conexión a la base de datos

export const Category = sequelize.define("category", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false,
    }
}, {
    timestamps: false
});

