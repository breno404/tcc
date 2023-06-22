import { Resolver, Query, Arg, Mutation, Field, ID } from "type-graphql";
import { CustomerInput } from "../types/input/customer.input";
import { Customer as CustomerType } from "../types/object/customer.type";
import CustomerService from "../services/customer.service";
import LoggerService from "../services/logger.service";

@Resolver(CustomerType)
class CustomerResolver {
  @Query(() => CustomerType, { nullable: true })
  async customerById(@Arg("id") id: string): Promise<CustomerType | null> {
    const service = new CustomerService();
    return service.findCustomerById(id);
  }

  @Query(() => CustomerType, { nullable: true })
  async customerByCnpj(
    @Arg("cnpj") cnpj: string
  ): Promise<CustomerType | null> {
    const service = new CustomerService();
    return service.findCustomerByCnpj(cnpj);
  }

  @Query(() => CustomerType, { nullable: true })
  async customerByName(
    @Arg("name") name: string
  ): Promise<CustomerType | null> {
    const service = new CustomerService();
    return service.findCustomerByName(name);
  }

  @Query(() => [CustomerType], { nullable: true })
  async customers(): Promise<CustomerType[]> {
    const service = new CustomerService();
    return service.findAllCustomers();
  }

  //---------------------------------------------------------------------------
  @Mutation(() => CustomerType)
  async createCustomer(
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: CustomerInput
  ): Promise<CustomerType | null> {
    const service = new CustomerService();
    const customer = await service.createCustomer(data);
    return customer
  }

  @Mutation(() => CustomerType)
  async updateCustomer(
    @Arg("id") id: string,
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: CustomerInput
  ): Promise<CustomerType | null> {
    const service = new CustomerService();
    return service.updateCustomer(id, data);
  }

  @Mutation(() => Boolean)
  async deleteCustomer(@Arg("id") id: string): Promise<boolean> {
    const service = new CustomerService();
    return service.deleteCustomer(id);
  }
}

export { CustomerResolver };
