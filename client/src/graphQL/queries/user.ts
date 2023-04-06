export const users: UserFunction = (fields) => `
query Users {
  users {
    ${fields.join("\n")}
  }
}
`;

export const userById: UserFunction = (fields, variables) => `
query UserById {
  user:userById(id: "${variables?.id}") {
    ${fields.join("\n")}
  }
}
`;

export const userByEmail: UserFunction = (fields, variables) => `
query UserByEmail {
  user:userByEmail(email: "${variables?.email}") {
    ${fields.join("\n")}
  }
}
`;
