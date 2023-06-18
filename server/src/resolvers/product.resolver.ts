import { Resolver, Query, Arg, Mutation, Field, ID } from "type-graphql";
import { ProductInput } from "../types/input/product.input";
import { Product as ProductType } from "../types/object/product.type";
import InventoryService from "../services/inventory.service";
import LoggerService from "../services/logger.service";

@Resolver(ProductType)
class ProductResolver {
  @Query(() => ProductType, { nullable: true })
  async productById(@Arg("id") id: string): Promise<ProductType | null> {
    const service = new InventoryService();
    return service.findProductById(id);
  }

  @Query(() => [ProductType], { nullable: true })
  async products(): Promise<ProductType[]> {
    const service = new InventoryService();

    return service.findAllProducts();
  }

  //---------------------------------------------------------------------------
  @Mutation(() => ProductType)
  async createProduct(
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: ProductInput
  ): Promise<ProductType | null> {
    const service = new InventoryService();
    return service.createProduct(data);
  }

  @Mutation(() => ProductType)
  async updateProduct(
    @Arg("id") id: string,
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: ProductInput
  ): Promise<ProductType | null> {
    const service = new InventoryService();
    return service.updateProduct(id, data);
  }

  @Mutation(() => Number)
  async deleteProduct(@Arg("id") id: string): Promise<number> {
    const service = new InventoryService();
    return service.deleteProduct(id);
  }
}

export { ProductResolver };
