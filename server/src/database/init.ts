import { User } from "../models";

const isDev = process.env.NODE_ENV === "development";

const init = () => {
  User.sync({ alter: isDev });
};

export default { init };
