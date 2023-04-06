import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class User {
  @Field(() => ID)
  id: String;

  @Field()
  name: String;

  @Field()
  phone: String;

  @Field()
  userName: String;

  @Field()
  email: String;

  @Field()
  password: String;
}

export { User };
