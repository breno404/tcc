import { Model, ModelAttributes, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../database/config";
import moment from "moment";

interface PurchaseAttributes {
  id: string;
  purchaseDate: string;
  productId: string;
  price: number;
  quantity: number;
  supplierId: string;
}

class Purchase extends Model<PurchaseAttributes> implements PurchaseAttributes {
  id: string;
  purchaseDate: string;
  productId: string;
  price: number;
  quantity: number;
  supplierId: string;
}

const modelAttributes: ModelAttributes<
  Purchase,
  Optional<PurchaseAttributes, never>
> = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: uuidv4(),
    allowNull: false,
    comment: "The value must be an UUIDV4",
  },
  purchaseDate: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  },
  productId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }, supplierId: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};

Purchase.init(modelAttributes, {
  sequelize,
  tableName: "purchases",
});

export default Purchase;
