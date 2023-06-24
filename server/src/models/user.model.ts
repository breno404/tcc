import { Model, ModelAttributes, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../database/config";

interface UserAttributes {
  id: string;
  name: string;
  phone: string;
  userName: string;
  email: string;
  active: boolean;
  password: string;
}

//<UserAttributes> implements UserAttributes

class User extends Model<UserAttributes> implements UserAttributes {
  id: string;
  name: string;
  phone: string;
  userName: string;
  email: string;
  active: boolean;
  password: string;
}

const modelAttributes: ModelAttributes<
  User,
  Optional<UserAttributes, never>
> = {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    defaultValue: uuidv4(),
    allowNull: false,
    comment: "The value must be an UUIDV4",
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: { type: DataTypes.STRING, allowNull: true, unique: true },
  userName: { type: DataTypes.STRING, allowNull: false, unique: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  active: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: "The value must be a HASH",
  },
};

User.init(modelAttributes, {
  sequelize,
  tableName: "users",
});

export default User;
