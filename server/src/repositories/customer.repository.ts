import { Op } from "sequelize";
import Customer from "../models/customer.model";
import { BaseRepository } from "./base.repository";

class CustomerRepository extends BaseRepository<Customer> {
  constructor() {
    super(Customer);
  }

  async findByCnpj(cnpj: string): Promise<Customer | null> {
    return this.model.findOne({ where: { cnpj } });
  }

  async findByName(name: string): Promise<Customer | null> {
    return this.model.findOne({
      where: { [Op.or]: [{ companyName: name }, { fantasyName: name }] },
    });
  }
}

export { CustomerRepository };
