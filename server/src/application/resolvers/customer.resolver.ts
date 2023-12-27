import { Resolver, Query, Arg, Mutation, Field, ID, Authorized, Ctx } from "type-graphql";
import { CustomerInput } from "../../types/input/customer.input";
import { Customer as CustomerType } from "../../types/object/customer.type";
import CustomerService from "../services/customer.service";
import LoggerService from "../services/logger.service";
import { AuthenticationError } from 'apollo-server';

@Resolver(CustomerType)
class CustomerResolver {
  @Query(() => CustomerType, { nullable: true })
  // @Authorized()
  async customerById(@Arg("id") id: string, @Ctx() context: { user: any }): Promise<CustomerType | null> {

    const service = new CustomerService();
    return service.findCustomerById(id);
  }

  @Query(() => CustomerType, { nullable: true })
  // @Authorized()
  async customerByCnpj(
    @Arg("cnpj") cnpj: string, @Ctx() context: { user: any }
  ): Promise<CustomerType | null> {

    const service = new CustomerService();
    return service.findCustomerByCnpj(cnpj);
  }

  @Query(() => CustomerType, { nullable: true })
  // @Authorized()
  async customerByName(
    @Arg("name") name: string, @Ctx() context: { user: any }
  ): Promise<CustomerType | null> {

    const service = new CustomerService();
    return service.findCustomerByName(name);
  }

  @Query(() => [CustomerType], { nullable: true })
  // @Authorized()
  async customers(@Ctx() context: { user: any }): Promise<CustomerType[]> {

    const service = new CustomerService();
    return service.findAllCustomers();
  }

  //---------------------------------------------------------------------------
  @Mutation(() => CustomerType)
  // @Authorized()
  async createCustomer(
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: CustomerInput, @Ctx() context: { user: any }
  ): Promise<CustomerType | null> {

    const service = new CustomerService();
    const customer = await service.createCustomer(data);
    return customer
  }

  @Mutation(() => CustomerType)
  // @Authorized()
  async updateCustomer(
    @Arg("id") id: string,
    @Arg("data", { validate: { forbidUnknownValues: false } })
    data: CustomerInput, @Ctx() context: { user: any }
  ): Promise<CustomerType | null> {

    const service = new CustomerService();
    return service.updateCustomer(id, data);
  }

  @Mutation(() => Boolean)
  // @Authorized()
  async deleteCustomer(@Arg("id") id: string, @Ctx() context: { user: any }): Promise<boolean> {

    const service = new CustomerService();
    return service.deleteCustomer(id);
  }
}

export { CustomerResolver };
