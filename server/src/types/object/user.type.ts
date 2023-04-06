import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  phone: string;

  @Field()
  userName: string;

  @Field()
  email: string;

  @Field()
  password: string;
}

export { User };
