
import { ModelAttributes, Optional, DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../database/config";
import Address from "../../domain/entities/address.entity";

interface AddressModel extends Address, Model { }

const modelAttributes: ModelAttributes<
  AddressModel,
  Optional<Address, never>
> = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: uuidv4(),
    allowNull: false,
    comment: "The value must be an UUIDV4",
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  }, city: {
    type: DataTypes.STRING,
    allowNull: false,
  }, district: {
    type: DataTypes.STRING,
    allowNull: false,
  }, street: {
    type: DataTypes.STRING,
    allowNull: false,
  }, number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
};

export default sequelize.define("Address", modelAttributes, {
  tableName: "tb_address",
});

