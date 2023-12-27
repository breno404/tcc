import { CustomerRepository } from "../repositories/customer.repository";
import { Customer as CustomerType } from "../../types/object/customer.type";
import { v4 as uuid } from 'uuid'
import LoggerService from "./logger.service";
import { Customer, File } from "../models";
import moment from "moment";

class CustomerService implements ISubject {
  private observers: IObserver[];

  registerObserver(observer: IObserver): void {
    throw new Error("Method not implemented.");
  }
  removeObserver(observer: IObserver): void {
    throw new Error("Method not implemented.");
  }
  notifyObservers(args?: any): void {
    for (const observer of this.observers) {
      observer.update(args);
    }
  }

  notifyObserver(observerType: string, args?: any): void {
    for (const observer of this.observers) {
      if (observer.observerType === observerType) {
        observer.update(args);
      }
    }
  }

  private readonly customerRepository = new CustomerRepository();

  async findCustomerById(id: string): Promise<CustomerType | null> {
    let customer = await this.customerRepository.findById(id);
    if (!customer) return null;
    return customer.toJSON();
  }

  async findCustomerByCnpj(cnpj: string): Promise<CustomerType | null> {
    const customer = await this.customerRepository.findByCnpj(cnpj);
    if (!customer) return null;
    return customer.toJSON();
  }

  async findCustomerByName(name: string): Promise<CustomerType | null> {
    const customer = await this.customerRepository.findByName(name);
    if (!customer) return null;
    return customer.toJSON();
  }

  async findAllCustomers(): Promise<CustomerType[]> {
    const customers = (await this.customerRepository.findAll()).map((u) =>
      u.toJSON()
    );
    return customers;
  }

  async createCustomer(attributes): Promise<CustomerType | null> {
    const id = uuid()
    try {
      const customer = await this.customerRepository.create({ ...attributes, id });
      if (!customer)
        throw Error(`Something went wrong during customer creation`);
      return customer;
    } catch (err) {
      this.notifyObserver("LoggerService", (err as Error).toString());
      return null;
    }
  }

  async updateCustomer(
    id: string,
    attributes: Partial<CustomerType>
  ): Promise<CustomerType | null> {
    await this.customerRepository.update(id, attributes);
    const customer = await this.customerRepository.findById(id);
    if (!customer) return null;
    return customer.toJSON();
  }

  async deleteCustomer(id: string): Promise<boolean> {
    const deletedRows = await this.customerRepository.delete(id);
    return Boolean(deletedRows);
  }

  async syncProfileImageById(customerId: any, destPath: string) {
    const id = uuid()
    const separatePath = destPath.split('/')
    const nameAndExt = separatePath.at(separatePath.length - 1)?.split('.')

    try {
      const customer = await Customer.findByPk(customerId);
      if (customer) {
        const file = await File.create({ id, path: destPath, ext: String(nameAndExt?.at(1)), name: String(nameAndExt?.at(0)), lastModified: moment(new Date()).toDate() })

        await file.setCustomers([customer]); // Associa o arquivo ao usuário

        console.log('Arquivo criado e associado ao cliente com sucesso!');
      } else {
        console.log('Cliente não encontrado!');
      }
    } catch (error) {
      console.log('Erro ao criar e associar o arquivo:', error);
    }
  }
  deleteProfileImage(customerId: any) { }
}

export default CustomerService;
