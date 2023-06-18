import { Resolver, Query, Arg, Mutation, Field, ID } from "type-graphql";
import { SaleInput } from "../types/input/sale.input";
import { Sale as SaleType } from "../types/object/sale.type";
import SaleService from "../services/sale.service";
import InventoryService from "../services/inventory.service";
import LoggerService from "../services/logger.service";

@Resolver(SaleType)
class SaleResolver {
  @Query(() => SaleType, { nullable: true })
  async saleById(@Arg("id") id: string): Promise<SaleType | null> {
    const service = new SaleService();
    const inventoryService = new InventoryService();
    return service.findSaleById(id);
  }

  @Query(() => [SaleType], { nullable: true })
  async sales(): Promise<SaleType[]> {
    const service = new SaleService();
    const inventoryService = new InventoryService();

    return service.findAllSales();
  }

  //---------------------------------------------------------------------------
  @Mutation(() => SaleType)
  async createSale(
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: SaleInput
  ): Promise<SaleType | null> {
    const service = new SaleService();
    const inventoryService = new InventoryService();
    return service.createSale(data);
  }

  @Mutation(() => Number)
  async deleteSale(@Arg("id") id: string): Promise<number> {
    const service = new SaleService();
    const inventoryService = new InventoryService();
    return service.deleteSale(id);
  }
}

export { SaleResolver };
