import { ObjectType, Field } from "type-graphql";
import { File } from "./files.type";

@ObjectType()
class Supplier {
  @Field(() => String)
  id: string;

  @Field(() => String)
  companyName: string;

  @Field(() => String, { nullable: true })
  fantasyName: string;

  @Field(() => String)
  cnae: string;

  @Field(() => String)
  entityType: string;

  @Field(() => String)
  cnpj: string;

  @Field(() => String, { nullable: true })
  cep: string;

  @Field(() => String, { nullable: true })
  district: string;

  @Field(() => String, { nullable: true })
  street: string;

  @Field(() => String, { nullable: true })
  streetNumber: string;

  @Field(() => String, { nullable: true })
  city: string;

  @Field(() => String, { nullable: true })
  phone: string;

  @Field(() => String, { nullable: true })
  email: string;

  @Field(() => File, { nullable: true })
  profile?: File;
}

export { Supplier };
