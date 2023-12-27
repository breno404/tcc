import User from "./user.model";
import Product from "./product.model";
import Inventory from "./inventory.model";
import Supplier from "./supplier.model";
import Customer from "./customer.model";
import Purchase from "./purchase.model";
import Sale from "./sale.model";
import Contact from "./contact.model";
import Address from "./address.model";
import Category from "./category.model";
import Permission from "./permission.model";


//Product x Inventory
Product.hasOne(Inventory);
Inventory.belongsTo(Product);

//Product x Purchase
Product.belongsToMany(Purchase, { through: 'tb_purchase_item', foreignKey: 'productId' }); /* Possivelmente dará erro */
Purchase.belongsToMany(Product, { through: 'tb_purchase_item', foreignKey: 'purchaseId' }); /* Possivelmente dará erro */

//Product x Sale
Product.belongsToMany(Sale, { through: 'tb_sale_item', foreignKey: 'productId' }); /* Possivelmente dará erro */
Sale.belongsToMany(Product, { through: 'tb_sale_item', foreignKey: 'saleId' }); /* Possivelmente dará erro */

//Product x Category
Product.hasMany(Category);
Category.belongsTo(Product);

//Supplier x Purchase
Supplier.hasMany(Purchase)
Purchase.belongsTo(Supplier);

//Supplier x Contact 
Supplier.belongsToMany(Contact, { through: 'tb_supplier_contact', foreignKey: 'supplierId' }) /* Possivelmente dará erro */
Contact.belongsToMany(Supplier, { through: 'tb_supplier_contact', foreignKey: 'contactId' }); /* Possivelmente dará erro */

//Supplier x Address
Supplier.belongsToMany(Address, { through: 'tb_supplier_address', foreignKey: 'supplierId' }) /* Possivelmente dará erro */
Address.belongsToMany(Supplier, { through: 'tb_supplier_address', foreignKey: 'addressId' }); /* Possivelmente dará erro */

//Customer x Sale
Customer.hasMany(Sale)
Sale.belongsTo(Customer);

//Customer x Contact 
Customer.belongsToMany(Contact, { through: 'tb_customer_contact', foreignKey: 'customerId' }) /* Possivelmente dará erro */
Contact.belongsToMany(Customer, { through: 'tb_customer_contact', foreignKey: 'contactId' }); /* Possivelmente dará erro */

//Customer x Address
Customer.belongsToMany(Address, { through: 'tb_customer_address', foreignKey: 'customerId' }) /* Possivelmente dará erro */
Address.belongsToMany(Customer, { through: 'tb_customer_address', foreignKey: 'addressId' }); /* Possivelmente dará erro */

//User x Purchase
User.hasMany(Purchase);
Purchase.belongsTo(User);

//User x Sale
User.hasMany(Sale);
Sale.belongsTo(User);

//User x Permission
User.belongsToMany(Permission, { through: 'tb_permission_user', foreignKey: 'permissionId' }) /* Possivelmente dará erro */
Permission.belongsToMany(User, { through: 'tb_permission_user', foreignKey: 'userId' }); /* Possivelmente dará erro */

export { User, Customer, Inventory, Product, Supplier };
