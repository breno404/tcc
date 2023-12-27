import { Dialect, Options as SequelizeOptions, Sequelize } from "sequelize";
import path from "node:path";

type Options = {
  [database in Dialect]: SequelizeOptions | undefined;
};

const options: Options = {
  mysql: {
    dialect: "mysql",
    host: "",
    port: 3306,
    database: "",
    username: "",
    password: "",
    timezone: "-03:00",
    schema: "",
    dialectOptions: {
      useUTC: false,
    },
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
      freezeTableName: true,
      timestamps: false,
    },
  },
  db2: undefined,
  mariadb: undefined,
  mssql: undefined,
  oracle: undefined,
  postgres: undefined,
  snowflake: undefined,
  sqlite: {
    dialect: "sqlite",
    storage: path.resolve(__dirname, "..", "..", "storage", "database.sqlite"), logging: true,
    dialectOptions: {
      useUTC: false,
    },
    define: {
      charset: "utf8",
      collate: "utf8_general_ci",
      freezeTableName: true,
      timestamps: false,
    },
  },
};

let sequelize: Sequelize;
const isDev = String(process.env.NODE_ENV).trim() == "development" || "dev";
if (isDev) sequelize = new Sequelize(options["sqlite"]);
else sequelize = new Sequelize(options["mysql"]);

export { sequelize };
