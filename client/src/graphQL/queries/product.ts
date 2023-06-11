import { gql } from "@apollo/client";

export const products = (fields: ProductAttribute[]) => gql`
query Products {
  products {
    ${fields.join("\n")}
  }
}
`;

export const productById = (fields: ProductAttribute[]) => gql`
query ProductById($id: String!) {
  product:productById(id: $id) {
    ${fields.join("\n")}
  }
}
`;

