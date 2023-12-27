
import { ModelAttributes, Optional, DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../database/config";
import Inventory from "../../domain/entities/inventory.entity";

interface InventoryModel extends Inventory, Model { }


const modelAttributes: ModelAttributes<
  InventoryModel,
  Optional<Inventory, never>
> = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: uuidv4(),
    allowNull: false,
    comment: "The value must be an UUIDV4",
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  productId: {
    type: DataTypes.STRING,
    references: { model: 'Product', key: 'id' },
    allowNull: false,
  }
};

export default sequelize.define("Inventory", modelAttributes, { tableName: 'tb_inventory' });


