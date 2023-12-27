
import { ModelAttributes, Optional, DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../database/config";
import Contact from "../../domain/entities/contact.entity";

interface ContactModel extends Contact, Model { }

const modelAttributes: ModelAttributes<
  ContactModel,
  Optional<Contact, never>
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
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  }, phone: {
    type: DataTypes.STRING,
    allowNull: true,
  }
};

export default sequelize.define("Contact", modelAttributes, {
  tableName: "tb_contact",
});

