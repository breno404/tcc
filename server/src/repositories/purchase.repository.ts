
import Purchase from "../models/purchase.model";
import { BaseRepository } from "./base.repository";

class PurchaseRepository extends BaseRepository<Purchase> {
  constructor() {
    super(Purchase);
  }

}

export { PurchaseRepository };
