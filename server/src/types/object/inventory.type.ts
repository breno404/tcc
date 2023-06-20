import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Inventory {
  @Field(() => String)
  id: string;

  @Field(() => String)
  productId: string;

  @Field(() => String)
  quantityId: number;

  @Field(() => String)
  lastModified: string | Date;
}

export { Inventory };
