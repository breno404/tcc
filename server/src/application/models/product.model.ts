
import { ModelAttributes, Optional, DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../database/config";
import Product from "../../domain/entities/product.entity";

interface ProductModel extends Product, Model { }

const modelAttributes: ModelAttributes<
  ProductModel,
  Optional<Product, never>
> = {
  id: {
    type: DataTypes.STRING,
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
  categoryId: {
    type: DataTypes.STRING,
    allowNull: true,
    references: { key: 'id', model: 'Category' }
  },
};

export default sequelize.define("Product", modelAttributes, {
  tableName: "tb_product",
});

