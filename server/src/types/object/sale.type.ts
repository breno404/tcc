import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Sale {
  @Field(() => String)
  id: string;

  @Field(() => String)
  saleDate: string;

  @Field(() => String)
  productId: string;

  @Field(() => String)
  price: number;

  @Field(() => String)
  quantity: number;

  @Field(() => String)
  customerId: string;
}

export { Sale };