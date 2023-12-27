
import { ModelAttributes, Optional, DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../database/config";
import Customer from "../../domain/entities/customer.entity";

interface CustomerModel extends Customer, Model { }

const modelAttributes: ModelAttributes<
  CustomerModel,
  Optional<Customer, never>
> = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: uuidv4(),
    allowNull: false,
    comment: "The value must be an UUIDV4",
  },
  companyName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fantasyName: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cnae: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  cnpj: { type: DataTypes.STRING, allowNull: false },
  entityType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
};

export default sequelize.define("Customer", modelAttributes, { tableName: 'tb_customer' });


