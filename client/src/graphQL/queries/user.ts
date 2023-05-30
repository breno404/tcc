import { gql } from "@apollo/client";

export const users: UserFunction = (fields) => `
query Users {
  users {
    ${fields.join("\n")}
  }
}
`;

export const userById: UserFunction = (fields, variables) => `
query UserById($) {
  user:userById(id: $id) {
    ${fields.join("\n")}
  }
}
`;

export const userByEmail = (fields: UserAttribute[]) => gql`
query UserByEmail($email: String!) {
  user:userByEmail(email: $email) {
    ${fields.join("\n")}
  }
}
`;
