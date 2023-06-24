import { gql } from "@apollo/client";

export const createPurchase = (fields: PurchaseAttribute[]) => gql`
    mutation CreatePurchase($data: PurchaseInput!) {
      createPurchase(data: $data) {
        ${fields.join("\n")}
      }
    }
  `;

export const deletePurchase = (fields: PurchaseAttribute[]) => gql`
    mutation DeletePurchase($id: String!) {
      deletePurchase(id: $id) {
        ${fields.join("\n")}
      }
    }
  `;
