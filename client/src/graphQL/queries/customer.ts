import { gql } from "@apollo/client";

export const customers = (fields: CustomerAttribute[]) => gql`
query Customers {
  customers {
    ${fields.join("\n")}
  }
}
`;

export const customerById = (fields: CustomerAttribute[]) => gql`
query CustomerById($id: String!) {
  customer:customerById(id: $id}) {
    ${fields.join("\n")}
  }
}
`;

export const customerByCnpj = (fields: CustomerAttribute[]) => gql`
query CustomerByCnpj($cnpj: String!) {
  customer:customerByCnpj(cnpj: $cnpj) {
    ${fields.join("\n")}
  }
}
`;

export const customerByName = (fields: CustomerAttribute[]) => gql`
query CustomerByName {
  customer:customerByName(name: $name) {
    ${fields.join("\n")}
  }
}
`;
