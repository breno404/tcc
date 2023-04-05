import { Model, DataTypes } from "sequelize";
import { sequelize } from "../database/config";

interface UserAttributes {
  id: string;
  name: string;
  userName: string;
  email: string;
  password: string;
}

class User extends Model<UserAttributes> implements UserAttributes {
  private _id!: string;
  private _name!: string;
  private _userName!: string;
  private _email!: string;
  private _password!: string;

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get userName() {
    return this._userName;
  }

  get email() {
    return this._email;
  }

  get password() {
    return this._password;
  }

  // public static associate(models: any): void {
  //   // Associações aqui
  // }
}

User.init(
  {
    id: {
      type: DataTypes.UUIDV4,
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
