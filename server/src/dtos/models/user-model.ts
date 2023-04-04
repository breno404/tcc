import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class UserModel {
  @Field()
  userName: String;

  @Field()
  name: String;

  @Field()
  email: String;

  @Field()
  phone: String;

  @Field()
  password: String;
}
