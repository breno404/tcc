import { InputType, Field } from "type-graphql";

@InputType()
class SupplierInput {
  @Field(() => String, { nullable: true })
  companyName: string;

  @Field(() => String, { nullable: true })
  fantasyName: string;

  @Field(() => String, { nullable: true })
  cnae: string;

  @Field(() => String, { nullable: true })
  entityType: string;

  @Field(() => String, { nullable: true })
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
}

export { SupplierInput };
