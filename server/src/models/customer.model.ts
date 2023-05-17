import { Model, ModelAttributes, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../database/config";

interface CustomerAttributes {
  id: string;
  companyName: string;
  fantasyName: string;
  cnae: string;
  cnpj: string;
  entityType: string;
  cep: string;
  district: string;
  city: string;
  street: string;
  streetNumber: string;
  phone: string;
  email: string;
}

//<UserAttributes> implements UserAttributes

class Customer extends Model<CustomerAttributes> implements CustomerAttributes {
  id: string;
  companyName: string;
  fantasyName: string;
  cnae: string;
  cnpj: string;
  entityType: string;
  cep: string;
  district: string;
  city: string;
  street: string;
  streetNumber: string;
  phone: string;
  email: string;
}

const modelAttributes: ModelAttributes<
  Customer,
  Optional<CustomerAttributes, never>
> = {
  id: {
    type: DataTypes.UUIDV4,
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
  entityType: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cnpj: { type: DataTypes.STRING, allowNull: false },
  cep: { type: DataTypes.STRING, allowNull: true },
  phone: { type: DataTypes.STRING, allowNull: true, unique: true },
  email: { type: DataTypes.STRING, allowNull: true, unique: true },
  city: { type: DataTypes.STRING, allowNull: true },
  street: { type: DataTypes.STRING, allowNull: true },
  streetNumber: { type: DataTypes.STRING, allowNull: true },
  district: { type: DataTypes.STRING, allowNull: true },
};

Customer.init(modelAttributes, {
  sequelize,
  tableName: "customers",
});

export default Customer;
