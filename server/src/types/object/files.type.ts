import { ObjectType, Field } from "type-graphql";

@ObjectType()
class File {
  @Field(() => String)
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
