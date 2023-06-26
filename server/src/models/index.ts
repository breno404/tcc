import User from "./user.model";
import Product from "./product.model";
import Inventory from "./inventory.model";
import Supplier from "./supplier.model";
import Customer from "./customer.model";
import File from "./file.model";
import Purchase from "./purchase.model";
import Sale from "./sale.model";

Product.hasOne(Inventory);
Product.hasMany(Purchase);
Product.hasMany(Sale);

Inventory.belongsTo(Product);
Purchase.belongsTo(Product);
Sale.belongsTo(Product);

Supplier.hasMany(Purchase)
Purchase.belongsTo(Supplier);

Customer.hasMany(Sale)
Sale.belongsTo(Customer);

User.belongsToMany(File, { through: 'files_users' });
File.belongsToMany(User, { through: 'files_users' });

Supplier.belongsToMany(File, { through: 'files_suppliers' });
File.belongsToMany(Supplier, { through: 'files_suppliers' });

Customer.belongsToMany(File, { through: 'files_customers' });
File.belongsToMany(Customer, { through: 'files_customers' });


export { User, Customer, File, Inventory, Product, Supplier };
