import { Op } from "sequelize";
import Product from "../models/product.model";
import { BaseRepository } from "./base.repository";

class ProductRepository extends BaseRepository<Product> {
  constructor() {
    super(Product);
  }
}

export { ProductRepository };
