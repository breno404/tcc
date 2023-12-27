import { Model, ModelAttributes, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../database/config";
import moment from "moment";
import Sale from "../../domain/entities/sale.entity";

interface SaleModel extends Sale, Model { }

const modelAttributes: ModelAttributes<
  SaleModel,
  Optional<Sale, never>
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
  }, customerId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: { key: 'id', model: 'Customer' }
  }, date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: moment.utc(new Date()).format(),
  },
};

export default sequelize.define("Sale", modelAttributes, { tableName: "tb_sale" });