
import Product from "../models/product.model";
import Inventory from "../models/inventory.model";
import { Product as ProductType } from "../types/object/product.type";
import { Inventory as InventoryType } from "../types/object/inventory.type";
import { BaseRepository } from "./base.repository";
import { ProductInput } from "../types/input/product.input";
import { v4 as uuid } from "uuid";
import moment from "moment";

class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product);
  }

  async findByIdWithInventoryAttributes(
    id: string
  ): Promise<(ProductType & Partial<InventoryType>) | null> {
    const inventory = await Inventory.findOne({
      attributes: ["quantity"],
      where: { productId: id },
    });

    const product = await this.model.findByPk(id);

    if (!product) {
      return product;
    }

    let response: ProductType & Partial<InventoryType> = {
      ...product?.toJSON(),
    };
    if (inventory) {
      response.quantity = inventory.quantity;
    }

    return response;
  }

  async findAllWithInventoryAttributes(): Promise<
    (ProductType & Partial<InventoryType>)[] | null
  > {
    let products = await Product.findAll({
      include: { model: Inventory },
    });

    if (products && products.length > 0) {
      return products.map((p: Product) => {
        let prod: any = p.toJSON();
        if (!p.inventory) {
          prod.quantity = 0;
        } else {
          prod.quantity = p.inventory.quantity;
        }

        return prod;
      });
    } else {
      return [];
    }
  }

  async create(
    attributes: ProductInput
  ): Promise<(ProductType & Partial<InventoryType>) | null> {
    const product = await this.model.create({
      id: uuid(),
      name: attributes.name,
      description: attributes.description,
      price: attributes.price,
      category: attributes.category,
    });

    await Inventory.create({
      id: uuid(),
      productId: product.id,
      quantity: attributes.quantity,
      lastModified: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
    });

    return this.findByIdWithInventoryAttributes(product.id);
  }
}

export { ProductRepository };
