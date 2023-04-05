import { Dialect, Options as SequelizeOptions, Sequelize } from "sequelize";

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
      useUTC: false, // for reading from database
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
  sqlite: { dialect: "sqlite", storage: "path/to/database.sqlite" },
};
