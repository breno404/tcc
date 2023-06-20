import { Resolver, Query, Arg, Mutation } from "type-graphql";
import { SaleInput } from "../types/input/sale.input";
import { Sale as SaleType } from "../types/object/sale.type";
import SaleService from "../services/sale.service";

@Resolver(SaleType)
class SaleResolver {
  @Query(() => SaleType, { nullable: true })
  async saleById(@Arg("id") id: string): Promise<SaleType | null> {
    const service = new SaleService();
    return service.findSaleById(id);
  }

  @Query(() => [SaleType], { nullable: true })
  async sales(): Promise<SaleType[]> {
    const service = new SaleService();

    return service.findAllSales();
  }

  //---------------------------------------------------------------------------
  @Mutation(() => SaleType)
  async createSale(
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: SaleInput
  ): Promise<SaleType | null> {
    const service = new SaleService();
    return service.createSale(data);
  }

  @Mutation(() => Number)
  async deleteSale(@Arg("id") id: string): Promise<number> {
    const service = new SaleService();
    return service.deleteSale(id);
  }
}

export { SaleResolver };
