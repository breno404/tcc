import { Model, ModelAttributes, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../database/config";
import moment from "moment";
import Purchase from "../../domain/entities/purchase.entity";

interface PurchaseModel extends Purchase, Model { }

const modelAttributes: ModelAttributes<
  PurchaseModel,
  Optional<Purchase, never>
> = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: uuidv4(),
    allowNull: false,
    comment: "The value must be an UUIDV4",
  }, userId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { key: 'id', model: 'User' }
  }, supplierId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { key: 'id', model: 'Supplier' }
  }, date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: moment.utc(new Date()).format(),
  },
};

export default sequelize.define("Purchase", modelAttributes, { tableName: "tb_purchase", });


