import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
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
});

export { sequelize };
