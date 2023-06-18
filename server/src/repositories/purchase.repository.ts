import { Op } from "sequelize";
import Purchase from "../models/purchase.model";
import Inventory from "../models/inventory.model";
import { Purchase as PurchaseType } from "../types/object/purchase.type";
import { Inventory as InventoryType } from "../types/object/inventory.type";
import { BaseRepository } from "./base.repository";
import { PurchaseInput } from "../types/input/purchase.input";
import { v4 as uuid } from "uuid";
import moment from "moment";

class PurchaseRepository extends BaseRepository<Purchase> {
  constructor() {
    super(Purchase);
  }

}

export { PurchaseRepository };
