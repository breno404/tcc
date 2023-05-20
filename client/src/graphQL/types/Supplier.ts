type SupplierAttribute =
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

type SupplierVariable = { [K in SupplierAttribute]?: string };

type SupplierFunction = (
  fields: SupplierAttribute[],
  variables?: SupplierVariable
) => string;
