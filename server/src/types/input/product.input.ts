import { InputType, Field } from "type-graphql";

@InputType()
class ProductInput {
  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  category: string;

  @Field()
  quantity: number;
}

export { ProductInput };
