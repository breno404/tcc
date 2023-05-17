type CustomerAttribute =
  | "id"
  | "companyName"
  | "fantasyName"
  | "entityType"
  | "cnpj"
  | "cep"
  | "district"
  | "street"
  | "streetNumber"
  | "phone"
  | "email"
  | "cnae"
  | "city";

type CustomerVariable = { [K in CustomerAttribute]?: string };

type CustomerFunction = (
  fields: CustomerAttribute[],
  variables?: CustomerVariable
) => string;
