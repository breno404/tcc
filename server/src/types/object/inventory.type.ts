import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class Inventory {
  @Field(() => ID)
  id: string;

  @Field(() => String)
  productId: string;

  @Field(() => String)
  quantityId: number;

  @Field(() => String)
  lastModified: string | Date;
}

export { Inventory };
