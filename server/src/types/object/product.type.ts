import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class Product {
  @Field(() => String)
  id: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String)
  price: number;

  @Field(() => String)
  category: string;

  @Field(() => String)
  quantity: number;
}

export { Product };
