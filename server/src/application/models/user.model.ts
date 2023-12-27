import { Model, ModelAttributes, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../database/config";
import User from "../../domain/entities/user.entity";

interface UserModel extends User, Model { }

const modelAttributes: ModelAttributes<
  UserModel,
  Optional<User, never>
> = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: uuidv4(),
    allowNull: false,
    comment: "The value must be an UUIDV4",
  },
  userName: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "The value must be a HASH",
  },
};

export default sequelize.define("User", modelAttributes, { tableName: "tb_user" });


