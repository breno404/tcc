import { InputType, Field } from "type-graphql";

@InputType()
class InventoryInput {
  @Field()
  productId: number;
  
  @Field()
  quantity: number;
}

export { InventoryInput };
