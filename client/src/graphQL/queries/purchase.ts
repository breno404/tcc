import { gql } from "@apollo/client";

export const purchases = (fields: PurchaseAttribute[]) => gql`
query Purchases {
  purchases {
    ${fields.join("\n")}
  }
}
`;

export const purchaseById = (fields: PurchaseAttribute[]) => gql`
query PurchaseById($id: String!) {
  purchase:purchaseById(id: $id) {
    ${fields.join("\n")}
  }
}
`;

