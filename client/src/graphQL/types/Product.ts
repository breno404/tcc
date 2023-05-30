type ProductAttribute =
  | "id"
  | "name"
  | "description"
  | "price"
  | "quantity"
  | "category";

type ProductVariable = { [K in ProductAttribute]?: string };

type ProductFunction = (
  fields: ProductAttribute[],
  variables?: ProductVariable
) => string;
