import { ObjectType, Field, ID } from "type-graphql";
import { File } from "./files.type";

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

  @Field()
  active: boolean;

  @Field()
  profile?: File;
}

export { User };
