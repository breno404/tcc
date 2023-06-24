import { InputType, Field } from "type-graphql";

@InputType()
class UserInput {
  @Field(() => String, { nullable: true })
  name!: string;

  @Field(() => String, { nullable: true })
  userName!: string;

  @Field(() => String, { nullable: true })
  email!: string;

  @Field(() => String, { nullable: true })
  phone!: string;

  @Field(() => String, { nullable: true })
  password!: string;
}

export { UserInput };
