import { Resolver, Query, Arg, Mutation, Field, ID } from "type-graphql";
import { PurchaseInput } from "../types/input/purchase.input";
import { Purchase as PurchaseType } from "../types/object/purchase.type";
import PurchaseService from "../services/purchase.service";
import InventoryService from "../services/inventory.service";
import LoggerService from "../services/logger.service";

@Resolver(PurchaseType)
class PurchaseResolver {
  @Query(() => PurchaseType, { nullable: true })
  async purchaseById(@Arg("id") id: string): Promise<PurchaseType | null> {
    const service = new PurchaseService();
    const inventoryService = new InventoryService();
    return service.findPurchaseById(id);
  }

  @Query(() => [PurchaseType], { nullable: true })
  async purchases(): Promise<PurchaseType[]> {
    const service = new PurchaseService();
    const inventoryService = new InventoryService();

    return service.findAllPurchases();
  }

  //---------------------------------------------------------------------------
  @Mutation(() => PurchaseType)
  async createPurchase(
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: PurchaseInput
  ): Promise<PurchaseType | null> {
    const service = new PurchaseService();
    const inventoryService = new InventoryService();
    return service.createPurchase(data);
  }

  @Mutation(() => Number)
  async deletePurchase(@Arg("id") id: string): Promise<number> {
    const service = new PurchaseService();
    const inventoryService = new InventoryService();
    return service.deletePurchase(id);
  }
}

export { PurchaseResolver };
