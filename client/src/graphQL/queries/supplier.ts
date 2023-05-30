import { gql } from "@apollo/client";

export const suppliers = (fields: SupplierAttribute[]) => gql`
query Suppliers {
  suppliers {
    ${fields.join("\n")}
  }
}
`;

export const supplierById = (fields: SupplierAttribute[]) => gql`
query SupplierById($id: String!) {
  supplier:supplierById(id: $id) {
    ${fields.join("\n")}
  }
}
`;

export const supplierByCnpj = (fields: SupplierAttribute[]) => gql`
query SupplierByCnpj($cnpj: String!) {
  supplier:supplierByCnpj(cnpj: $cnpj) {
    ${fields.join("\n")}
  }
}
`;

export const supplierByName = (fields: SupplierAttribute[]) => gql`
query SupplierByName($name: String!) {
  supplier:supplierByName(name: $name) {
    ${fields.join("\n")}
  }
}
`;
