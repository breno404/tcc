import { InputType, Field } from "type-graphql";

@InputType()
class CustomerInput {
  @Field()
  companyName: string;

  @Field()
  fantasyName: string;

  @Field()
  cnae: string;

  @Field()
  entityType: string;

  @Field()
  cnpj: string;

  @Field()
  cep: string;

  @Field()
  district: string;

  @Field()
  street: string;

  @Field()
  streetNumber: string;

  @Field()
  city: string;

  @Field()
  phone: string;

  @Field()
  email: string;
}

export { CustomerInput };
