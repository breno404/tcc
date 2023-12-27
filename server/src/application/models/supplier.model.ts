
import { ModelAttributes, Optional, DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../database/config";
import Supplier from "../../domain/entities/supplier.entity";

interface SupplierModel extends Supplier, Model { }

const modelAttributes: ModelAttributes<
  SupplierModel,
  Optional<Supplier, never>
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

export default sequelize.define("Supplier", modelAttributes, { tableName: 'tb_supplier' });


