import { ObjectType, Field, ID } from "type-graphql";
import { File } from "./files.type";

@ObjectType()
class User {
  @Field(() => ID)
  id: string;

  @Field(() => String, { nullable: true })
  name: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: false })
  userName: string;

  @Field(() => String, { nullable: false })
  email: string;

  @Field(() => String, { nullable: false })
  password: string;

  @Field(() => Boolean, { nullable: false })
  active: boolean;

  @Field(() => File, { nullable: true })
  profile?: File;
}

export { User };
