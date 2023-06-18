import { InputType, Field } from "type-graphql";

@InputType()
class SaleInput {
  @Field()
  saleDate: string;

  @Field()
  productId: string;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  customerId: string;
}

export { SaleInput };