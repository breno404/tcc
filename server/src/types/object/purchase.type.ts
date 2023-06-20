import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Purchase {
  @Field(() => String)
  id: string;

  @Field(() => String)
  purchaseDate: string;

  @Field(() => String)
  productId: string;

  @Field(() => String)
  price: number;

  @Field(() => String)
  quantity: number;

  @Field(() => String)
  supplierId: string;
}

export { Purchase };
