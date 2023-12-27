
import { ModelAttributes, Optional, DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../database/config";
import Category from "../../domain/entities/category.entity";

interface CategoryModel extends Category, Model { }

const modelAttributes: ModelAttributes<
  CategoryModel,
  Optional<Category, never>
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
  parentId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      key: 'id',
      model: 'Category'
    }
  },
};

export default sequelize.define("Category", modelAttributes, {
  tableName: "tb_category",
});

