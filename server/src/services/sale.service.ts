import { SaleRepository } from "../repositories/sale.repository";
import { Sale as SaleType } from "../types/object/sale.type";
import { SaleInput } from "../types/input/sale.input"; import { v4 as uuid } from 'uuid'

class SaleService implements ISubject {
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

  private readonly saleRepository = new SaleRepository();

  async findSaleById(id: string): Promise<SaleType | null> {
    let sale = await this.saleRepository.findById(id);
    if (!sale) return null;

    return sale;
  }

  async findAllSales(): Promise<SaleType[]> {
    const sales =
      await this.saleRepository.findAll();

    if (!sales) {
      return [];
    }

    return sales;
  }

  async createSale(attributes: SaleInput): Promise<SaleType | null> {
    const id = uuid()
    try {
      const sale = await this.saleRepository.create({ id, ...attributes });
      if (!sale) throw Error(`Something went wrong during sale creation`);
      return sale;
    } catch (err) {
      this.notifyObserver("LoggerService", (err as Error).toString());
      return null;
    }
  }

  async updateSale(
    id: string,
    attributes: Partial<SaleType>
  ): Promise<SaleType | null> {
    await this.saleRepository.update(id, attributes);
    const sale =
      await this.saleRepository.findById(id);
    if (!sale) return null;
    return sale;
  }

  async deleteSale(id: string): Promise<number> {
    const deletedRows = await this.saleRepository.delete(id);
    return deletedRows;
  }

}

export default SaleService;
