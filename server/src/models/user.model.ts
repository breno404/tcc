import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/config";

interface UserAttributes {
  id: number;
  name: string;
  userName: string;
  email: string;
  password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public userName!: string;
  public email!: string;
  public password!: string;

  public static associate(models: any): void {
    // Associações aqui
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "users",
  }
);

export default User;