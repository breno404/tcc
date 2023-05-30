import { gql } from "@apollo/client";

export const createSupplier = (fields: SupplierAttribute[]) => gql`
    mutation CreateSupplier($data: SupplierInput!) {
      createSupplier(data: $data) {
        ${fields.join("\n")}
      }
    }
  `;

export const updateSupplier = (fields: SupplierAttribute[]) => gql`
    mutation UpdateSupplier($data: SupplierInput!) {
      updateSupplier(data: $data) {
        ${fields.join("\n")}
      }
    }
  `;

export const deleteSupplier = (fields: SupplierAttribute[]) => gql`
mutation DeleteSupplier(id: String!) {
  deleteSupplier(id: $id)
}
`;
