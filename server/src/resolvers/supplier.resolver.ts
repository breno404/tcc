import { Resolver, Query, Arg, Mutation, Field, ID } from "type-graphql";
import { SupplierInput } from "../types/input/supplier.input";
import { Supplier as SupplierType } from "../types/object/supplier.type";
import SupplierService from "../services/supplier.service";
import LoggerService from "../services/logger.service";

@Resolver(SupplierType)
class SupplierResolver {
  @Query(() => SupplierType, { nullable: true })
  async supplierById(@Arg("id") id: string): Promise<SupplierType | null> {
    const service = new SupplierService();
    return service.findSupplierById(id);
  }

  @Query(() => SupplierType, { nullable: true })
  async supplierByCnpj(
    @Arg("cnpj") cnpj: string
  ): Promise<SupplierType | null> {
    const service = new SupplierService();
    return service.findSupplierByCnpj(cnpj);
  }

  @Query(() => SupplierType, { nullable: true })
  async supplierByName(
    @Arg("name") name: string
  ): Promise<SupplierType | null> {
    const service = new SupplierService();
    return service.findSupplierByName(name);
  }

  @Query(() => [SupplierType], { nullable: true })
  async suppliers(): Promise<SupplierType[]> {
    const service = new SupplierService();
    return service.findAllSuppliers();
  }

  //---------------------------------------------------------------------------
  @Mutation(() => SupplierType)
  async createSupplier(
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: SupplierInput
  ): Promise<SupplierType | null> {
    const service = new SupplierService();
    return service.createSupplier(data);
  }

  @Mutation(() => SupplierType)
  async updateSupplier(
    @Arg("id") id: string,
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: SupplierInput
  ): Promise<SupplierType | null> {
    const service = new SupplierService();
    return service.updateSupplier(id, data);
  }

  @Mutation(() => Boolean)
  async deleteSupplier(@Arg("id") id: string): Promise<boolean> {
    const service = new SupplierService();
    return service.deleteSupplier(id);
  }
}

export { SupplierResolver };
