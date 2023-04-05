import { InputType, Field } from "type-graphql";

@InputType()
class UserInput {
  @Field()
  name!: string;
  
  @Field()
  userName!: string;

  @Field()
  email!: string;

  @Field()
  password!: string;
}

export { UserInput };
