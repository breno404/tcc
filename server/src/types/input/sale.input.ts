import { InputType, Field } from "type-graphql";

@InputType()
class SaleInput {
  @Field(() => String, { nullable: true })
  saleDate: string;

  @Field(() => String, { nullable: true })
  productId: string;

  @Field(() => Number, { nullable: true })
  price: number;

  @Field(() => Number, { nullable: true })
  quantity: number;

  @Field(() => String, { nullable: true })
  customerId: string;
}

export { SaleInput };