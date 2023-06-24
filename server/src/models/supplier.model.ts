import { Model, ModelAttributes, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../database/config";

interface SupplierAttributes {
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

class Supplier extends Model<SupplierAttributes> implements SupplierAttributes {
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
  Supplier,
  Optional<SupplierAttributes, never>
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

Supplier.init(modelAttributes, {
  sequelize,
  tableName: "suppliers",
});

export default Supplier;
