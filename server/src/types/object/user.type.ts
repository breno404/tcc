import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class User {
  @Field(() => ID)
  id!: BigInt;

  @Field()
  name!: String;

  @Field()
  email!: String;
}

export { User };
