import { DataTypes } from "sequelize";
import { sequelize } from "../../../db.js";

export const Product = sequelize.define(
  "product",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    brand: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    originalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    subcategory: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    rating: {
      type: DataTypes.FLOAT,
      defaultValue: 0,
    },
    reviews: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    isFeatured: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    isNew: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    features: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue("features");
        return rawValue ? JSON.parse(rawValue) : [];
      },
      set(value) {
        this.setDataValue("features", JSON.stringify(value));
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: false,
  },
);
