import { Op } from "sequelize";
import Supplier from "../models/supplier.model";
import { BaseRepository } from "./base.repository";

class SupplierRepository extends BaseRepository<Supplier> {
  constructor() {
    super(Supplier);
  }

  async findByCnpj(cnpj: string): Promise<Supplier | null> {
    return this.model.findOne({ where: { cnpj } });
  }

  async findByName(name: string): Promise<Supplier | null> {
    return this.model.findOne({
      where: { [Op.or]: [{ companyName: name }, { fantasyName: name }] },
    });
  }

}

export { SupplierRepository };
