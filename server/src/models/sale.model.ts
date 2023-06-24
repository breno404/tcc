import { Model, ModelAttributes, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../database/config";
import moment from "moment";

interface SaleAttributes {
  id: string;
  saleDate: string;
  productId: string;
  price: number;
  quantity: number;
  customerId: string;
}

class Sale extends Model<SaleAttributes> implements SaleAttributes {
  id: string;
  saleDate: string;
  productId: string;
  price: number;
  quantity: number;
  customerId: string;
}

const modelAttributes: ModelAttributes<
  Sale,
  Optional<SaleAttributes, never>
> = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: uuidv4(),
    allowNull: false,
    comment: "The value must be an UUIDV4",
  },
  saleDate: {
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
  }, customerId: {
    type: DataTypes.STRING,
    allowNull: false,
  }
};

Sale.init(modelAttributes, {
  sequelize,
  tableName: "sales",
});

export default Sale;
