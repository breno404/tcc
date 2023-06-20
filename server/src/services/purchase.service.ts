
import { Purchase as PurchaseType } from "../types/object/purchase.type";
import { PurchaseInput } from "../types/input/purchase.input"
import { v4 as uuid } from 'uuid'
import { PurchaseRepository } from "../repositories/purchase.repository";

class PurchaseService implements ISubject {
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

  private readonly purchaseRepository = new PurchaseRepository();

  async findPurchaseById(id: string): Promise<PurchaseType | null> {
    let purchase = await this.purchaseRepository.findById(id);
    if (!purchase) return null;

    return purchase;
  }

  async findAllPurchases(): Promise<PurchaseType[]> {
    const pruchases = await this.purchaseRepository.findAll();

    if (!pruchases) {
      return [];
    }

    return pruchases;
  }

  async createPurchase(attributes: PurchaseInput): Promise<PurchaseType | null> {
    const id = uuid()
    try {
      const purchase = await this.purchaseRepository.create({id,...attributes});
      if (!purchase) throw Error(`Something went wrong during purchase creation`);
      return purchase;
    } catch (err) {
      this.notifyObserver("LoggerService", (err as Error).toString());
      return null;
    }
  }

  async updatePurchase(
    id: string,
    attributes: Partial<PurchaseType>
  ): Promise<PurchaseType | null> {
    await this.purchaseRepository.update(id, attributes);
    const purchase =
      await this.purchaseRepository.findById(id);
    if (!purchase) return null;
    return purchase;
  }

  async deletePurchase(id: string): Promise<number> {
    const deletedRows = await this.purchaseRepository.delete(id);
    return deletedRows;
  }

}

export default PurchaseService;
