import { Field, InputType } from "type-graphql";

@InputType()
export class CreateUserInput {
  @Field()
  userId: string;

  @Field()
  userName: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  phone: string;

  @Field()
  password: string;
}
