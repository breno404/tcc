import { InputType, Field } from "type-graphql";

@InputType()
class PurchaseInput {
  @Field(() => String, { nullable: true })
  purchaseDate: string;

  @Field(() => String, { nullable: true })
  productId: string;

  @Field(() => Number, { nullable: true })
  price: number;

  @Field(() => Number, { nullable: true })
  quantity: number;

  @Field(() => String, { nullable: true })
  supplierId: string;
}

export { PurchaseInput };
