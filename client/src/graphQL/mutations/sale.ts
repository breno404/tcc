import { gql } from "@apollo/client";

export const createSale = (fields: SaleAttribute[]) => gql`
    mutation CreateSale($data: SaleInput!) {
      createSale(data: $data) {
        ${fields.join("\n")}
      }
    }
  `;

export const deleteSale = (fields: SaleAttribute[]) => gql`
    mutation DeleteSale($id: String!) {
      deleteSale(id: $id) {
        ${fields.join("\n")}
      }
    }
  `;
