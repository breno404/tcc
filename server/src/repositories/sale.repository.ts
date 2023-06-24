
import { Inventory, Product } from "../models";
import Sale from "../models/sale.model";
import { SaleInput } from "../types/input/sale.input";
import { BaseRepository } from "./base.repository";

class SaleRepository extends BaseRepository<Sale> {
  constructor() {
    super(Sale);
  }

  async createAndUpdateInventory(id: string, data: SaleInput) {
    const pu = await Sale.create({ id, price: data.price, productId: data.productId, saleDate: data.saleDate, quantity: data.quantity, customerId: data.customerId })
    if (!pu) {
      throw new Error('Don\'t was possible create pruchase')
    }
    let product = await Product.findOne({ where: { id: data.productId } })
    if (!product) {
      throw new Error('Product not exist!')
    }
    let inventory = await Inventory.findOne({ where: { productId: data.productId } })
    inventory = await inventory?.update({ quantity: inventory.quantity - pu.quantity }, { where: { productId: data.productId } }) as Inventory
    product = await product?.update({ price: (data.price + product.price) / inventory.quantity }, { where: { id: data.productId } }) as Product
    return pu
  }
}

export { SaleRepository };
