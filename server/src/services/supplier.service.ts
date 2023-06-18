import { SupplierRepository } from "../repositories/supplier.repository";
import { Supplier as SupplierType } from "../types/object/supplier.type";
import LoggerService from "./logger.service"; import { v4 as uuid } from 'uuid'

class SupplierService implements ISubject {
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

  private readonly supplierRepository = new SupplierRepository();

  async findSupplierById(id: string): Promise<SupplierType | null> {
    let supplier = await this.supplierRepository.findById(id);
    if (!supplier) return null;
    return supplier.toJSON();
  }

  async findSupplierByCnpj(cnpj: string): Promise<SupplierType | null> {
    const supplier = await this.supplierRepository.findByCnpj(cnpj);
    if (!supplier) return null;
    return supplier.toJSON();
  }

  async findSupplierByName(name: string): Promise<SupplierType | null> {
    const supplier = await this.supplierRepository.findByName(name);
    if (!supplier) return null;
    return supplier.toJSON();
  }

  async findAllSuppliers(): Promise<SupplierType[]> {
    const suppliers = (await this.supplierRepository.findAll()).map((u) =>
      u.toJSON()
    );
    return suppliers;
  }

  async createSupplier(attributes): Promise<SupplierType | null> {
    const id = uuid()
    try {
      const supplier = await this.supplierRepository.create(attributes);
      if (!supplier)
        throw Error(`Something went wrong during supplier creation`);
      return supplier;
    } catch (err) {
      this.notifyObserver("LoggerService", (err as Error).toString());
      return null;
    }
  }

  async updateSupplier(
    id: string,
    attributes: Partial<SupplierType>
  ): Promise<SupplierType | null> {
    await this.supplierRepository.update(id, attributes);
    const supplier = await this.supplierRepository.findById(id);
    if (!supplier) return null;
    return supplier.toJSON();
  }

  async deleteSupplier(id: string): Promise<boolean> {
    const deletedRows = await this.supplierRepository.delete(id);
    return Boolean(deletedRows);
  }

  syncProfileImageById(supplierId: any, destPath: string) { }
  deleteProfileImage(supplierId: any) { }
}

export default SupplierService;
