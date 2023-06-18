import { InputType, Field } from "type-graphql";

@InputType()
class PurchaseInput {
  @Field()
  purchaseDate: string;

  @Field()
  productId: string;

  @Field()
  price: number;

  @Field()
  quantity: number;

  @Field()
  supplierId: string;
}

export { PurchaseInput };
