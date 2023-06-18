import { Op } from "sequelize";
import Sale from "../models/sale.model";
import Inventory from "../models/inventory.model";
import { Sale as SaleType } from "../types/object/sale.type";
import { Inventory as InventoryType } from "../types/object/inventory.type";
import { BaseRepository } from "./base.repository";
import { SaleInput } from "../types/input/sale.input";
import { v4 as uuid } from "uuid";
import moment from "moment";

class SaleRepository extends BaseRepository<Sale> {
  constructor() {
    super(Sale);
  }

}

export { SaleRepository };
