import User from "./user.model";
import Product from "./product.model";
import Inventory from "./inventory.model";
import Supplier from "./supplier.model";
import Customer from "./customer.model";
import File from "./file.model";

Product.hasOne(Inventory);
Inventory.belongsTo(Product);

export { User, Customer, File, Inventory, Product, Supplier };
