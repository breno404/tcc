
import { Inventory, Product } from "../models";
import Purchase from "../models/purchase.model";
import { PurchaseInput } from "../types/input/purchase.input";
import { BaseRepository } from "./base.repository";

class PurchaseRepository extends BaseRepository<Purchase> {
  constructor() {
    super(Purchase);
  }

  async createAndUpdateInventory(id: string, data: PurchaseInput) {
    const pu = await Purchase.create({ id, price: data.price, productId: data.productId, purchaseDate: data.purchaseDate, quantity: data.quantity, supplierId: data.supplierId })
    if (!pu) {
      throw new Error('Don\'t was possible create pruchase')
    }
    let product = await Product.findOne({ where: { id: data.productId } })
    if (!product) {
      throw new Error('Product not exist!')
    }
    let inventory = await Inventory.findOne({ where: { productId: data.productId } })
    inventory = await inventory?.update({ quantity: pu.quantity + inventory.quantity }, { where: { productId: data.productId } }) as Inventory
    product = await product?.update({ price: (data.price + product.price) / inventory.quantity }, { where: { id: data.productId } }) as Product
    return pu
  }
}

export { PurchaseRepository };
