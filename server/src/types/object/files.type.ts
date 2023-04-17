import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
class File {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  path: string;

  @Field()
  ext: string;

  @Field()
  lastModified: Date;
}

export { File };
