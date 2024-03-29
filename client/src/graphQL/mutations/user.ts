import { gql } from "@apollo/client";

export const createUser = (fields: UserAttribute[]) => gql`
    mutation CreateUser($data: UserInput!) {
      createUser(data: $data) {
        ${fields.join("\n")}
      }
    }
  `;

export const updateUser = (fields: UserAttribute[]) => gql`
    mutation UpdateUser($id:String!,$data: UserInput!) {
      updateUser(data: $data, id: $id) {
        ${fields.join("\n")}
      }
    }
  `;

export const deleteUser = (fields: UserAttribute[]) => gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id)
  }
`;
