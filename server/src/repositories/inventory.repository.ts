import { Op } from "sequelize";
import Inventory from "../models/inventory.model";
import { BaseRepository } from "./base.repository";

class InventoryRepository extends BaseRepository<Inventory> {
  constructor() {
    super(Inventory);
  }
}

export { InventoryRepository };
