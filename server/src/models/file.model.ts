import { Model, ModelAttributes, Optional, DataTypes } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import { sequelize } from "../database/config";

interface FileAttributes {
  id: string;
  name: string;
  path: string;
  ext: string;
  lastModified: Date;
}

class File extends Model<FileAttributes> implements FileAttributes {
  id: string;
  name: string;
  path: string;
  ext: string;
  lastModified: Date;
}

const modelAttributes: ModelAttributes<
  File,
  Optional<FileAttributes, never>
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
  path: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  ext: {
    type: DataTypes.STRING,
  },
  lastModified: {
    type: DataTypes.DATE,
    defaultValue: new Date(),
  },
};

File.init(modelAttributes, {
  sequelize,
  tableName: "files",
});

export default File;
