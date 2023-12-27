import {
  User, Customer,
  Category,
  Address,
  Contact,
  Customer,
  Purchase,
  Sale, Inventory, Product, Supplier
} from "../application/models";

const isDev = process.env.NODE_ENV === "development";

const init = () => {
  User.sync({ alter: isDev });
  Category.sync({ alter: isDev });
  Address.sync({ alter: isDev });
  Contact.sync({ alter: isDev });
  Customer.sync({ alter: isDev });
  Purchase.sync({ alter: isDev });
  Sale.sync({ alter: isDev });
  Inventory.sync({ alter: isDev });
  Product.sync({ alter: isDev });
  Supplier.sync({ alter: isDev });
};

export default { init };
