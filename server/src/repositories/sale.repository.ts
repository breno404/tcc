
import Sale from "../models/sale.model";
import { BaseRepository } from "./base.repository";

class SaleRepository extends BaseRepository<Sale> {
  constructor() {
    super(Sale);
  }

}

export { SaleRepository };
