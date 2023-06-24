import { InputType, Field } from "type-graphql";

@InputType()
class InventoryInput {
  @Field(() => String, { nullable: true })
  productId: string;
  
  @Field(() => Number, { nullable: true })
  quantity: number;
}

export { InventoryInput };
