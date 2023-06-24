import { gql } from "@apollo/client";

export const createProduct = (fields: ProductAttribute[]) => gql`
    mutation CreateProduct($data: ProductInput!) {
      createProduct(data: $data) {
        ${fields.join("\n")}
      }
    }
  `;

export const updateProduct = (fields: ProductAttribute[]) => gql`
    mutation UpdateProduct($id: String!, $data: ProductInput!) {
      updateProduct(data: $data, id: $id) {
        ${fields.join("\n")}
      }
    }
  `;
