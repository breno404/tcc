import { ProductRepository } from "../repositories/product.repository";
import { InventoryRepository } from "../repositories/inventory.repository";
import { Product as ProductType } from "../types/object/product.type";
import { Inventory as InventoryType } from "../types/object/inventory.type";
import LoggerService from "./logger.service";
import { ProductInput } from "../types/input/product.input"; import { v4 as uuid } from 'uuid'

class InventoryService implements ISubject {
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

  private readonly inventoryRepository = new InventoryRepository();
  private readonly productRepository = new ProductRepository();

  async findProductById(id: string): Promise<ProductType | null> {
    let product = await this.productRepository.findByIdWithInventoryAttributes(
      id
    );
    if (!product) return null;

    return product;
  }

  async findAllProducts(): Promise<ProductType[]> {
    const products =
      await this.productRepository.findAllWithInventoryAttributes();

    if (!products) {
      return [];
    }

    return products;
  }

  async createProduct(attributes: ProductInput): Promise<ProductType | null> {
    const id = uuid()
    try {
      const product = await this.productRepository.create(attributes);
      if (!product) throw Error(`Something went wrong during product creation`);
      return product;
    } catch (err) {
      this.notifyObserver("LoggerService", (err as Error).toString());
      return null;
    }
  }

  async updateProduct(
    id: string,
    attributes: Partial<ProductType>
  ): Promise<ProductType | null> {
    await this.productRepository.update(id, attributes);
    const product =
      await this.productRepository.findByIdWithInventoryAttributes(id);
    if (!product) return null;
    return product;
  }

  async deleteProduct(id: string): Promise<number> {
    const deletedRows = await this.productRepository.delete(id);
    return deletedRows;
  }

  syncProfileImageById(productId: any, destPath: string) { }
  deleteProfileImage(productId: any) { }
}

export default InventoryService;
