import { Model, ModelAttributes, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../database/config";

interface InventoryAttributes {
  id: string;
  quantity: number;
  productId: string;
  lastModified: Date | string;
}

//<UserAttributes> implements UserAttributes

class Inventory
  extends Model<InventoryAttributes>
  implements InventoryAttributes
{
  id: string;
  quantity: number;
  productId: string;
  lastModified: Date | string;
}

const modelAttributes: ModelAttributes<
  Inventory,
  Optional<InventoryAttributes, never>
> = {
  id: {
    type: DataTypes.UUIDV4,
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
    allowNull: false,
  },
  lastModified: {
    type: DataTypes.DATE,
    allowNull: false,
  },
};

Inventory.init(modelAttributes, {
  sequelize,
  tableName: "inventories",
});

export default Inventory;
