import { Model, ModelAttributes, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../database/config";
import Inventory from "./inventory.model";

interface ProductAttributes {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
}

//<UserAttributes> implements UserAttributes

class Product extends Model<ProductAttributes> implements ProductAttributes {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  inventory?: Inventory;
}

const modelAttributes: ModelAttributes<
  Product,
  Optional<ProductAttributes, never>
> = {
  id: {
    type: DataTypes.UUIDV4,
    primaryKey: true,
    defaultValue: uuidv4(),
    allowNull: false,
    comment: "The value must be an UUIDV4",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

Product.init(modelAttributes, {
  sequelize,
  tableName: "products",
});

export default Product;
