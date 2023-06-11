import { gql } from "@apollo/client";

export const sales = (fields: SaleAttribute[]) => gql`
query Sales {
  sales {
    ${fields.join("\n")}
  }
}
`;

export const saleById = (fields: SaleAttribute[]) => gql`
query SaleById($id: String!) {
  sale:saleById(id: $id) {
    ${fields.join("\n")}
  }
}
`;

