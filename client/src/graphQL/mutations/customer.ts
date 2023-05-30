import { gql } from "@apollo/client";

export const createCustomer = (fields: CustomerAttribute[]) => gql`
    mutation CreateCustomer($data: CustomerInput!) {
      createCustomer(data: $data) {
        ${fields.join("\n")}
      }
    }
  `;

export const updateCustomer = (fields: CustomerAttribute[]) => gql`
 
    mutation UpdateCustomer ($data: CustomerInput!, $id: String!){
      updateCustomer(data: $data, id: $id) {
        ${fields.join("\n")}
      }
    }
  `;

export const deleteCustomer = (fields: CustomerAttribute[]) => gql`
  mutation DeleteCustomer($id: String!) {
    deleteCustomer(id: $id)
  }
`;
