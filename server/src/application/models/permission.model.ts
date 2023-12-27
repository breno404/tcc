
import { ModelAttributes, Optional, DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../../database/config";
import Permission from "../../domain/entities/permission.entity";

interface PermissionModel extends Permission, Model { }

const modelAttributes: ModelAttributes<
  PermissionModel,
  Optional<Permission, never>
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
  parentId: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      key: 'id',
      model: 'Permission'
    }
  },
};

export default sequelize.define("Permission", modelAttributes, {
  tableName: "tb_permission",
});

