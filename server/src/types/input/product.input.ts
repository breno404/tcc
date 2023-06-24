import { InputType, Field } from "type-graphql";

@InputType()
class ProductInput {
  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => Number, { nullable: true })
  price: number;

  @Field(() => String, { nullable: true })
  category: string;

  @Field(() => Number, { nullable: true })
  quantity: number;
}

export { ProductInput };
