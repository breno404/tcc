import { User, Customer, File, Inventory, Product, Supplier } from "../models";

const isDev = process.env.NODE_ENV === "development";

const init = () => {
  User.sync({ alter: isDev });
  Customer.sync({ alter: isDev });
  File.sync({ alter: isDev });
  Inventory.sync({ alter: isDev });
  Product.sync({ alter: isDev });
  Supplier.sync({ alter: isDev });
};

export default { init };
