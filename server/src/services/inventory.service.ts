import { ProductRepository } from "../repositories/product.repository";
import { InventoryRepository } from "../repositories/inventory.repository";
import { Product as ProductType } from "../types/object/product.type";
import { Inventory as InventoryType } from "../types/object/inventory.type";
import LoggerService from "./logger.service";

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
    let product = await this.productRepository.findById(id);
    if (!product) return null;
    return product.toJSON();
  }

  async findAllProducts(): Promise<ProductType[]> {
    const products = (await this.productRepository.findAll()).map((p) =>
      p.toJSON()
    );
    return products;
  }

  async createProduct(attributes): Promise<ProductType | null> {
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
    const product = await this.productRepository.findById(id);
    if (!product) return null;
    return product.toJSON();
  }

  async deleteProduct(id: string): Promise<boolean> {
    const deletedRows = await this.productRepository.delete(id);
    return Boolean(deletedRows);
  }

  syncProfileImageById(productId: any, destPath: string) {}
  deleteProfileImage(productId: any) {}
}

export default InventoryService;
