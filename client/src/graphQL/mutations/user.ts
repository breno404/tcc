export const createUser: UserFunction = (fields, variables) => {
  let data: string[] = Object.entries(Object(variables)).map(
    (e) => `${e[0]}:${e[1]}`
  );
  return `
    mutation CreateUser {
      createUser(data: {${data.join(",\n")}) {
        ${fields.join("\n")}
      }
    }
  `;
};

export const updateUser: UserFunction = (fields, variables) => {
  const id = variables?.id;
  delete variables?.id;
  let data: string[] = Object.entries(Object(variables)).map(
    (e) => `${e[0]}:${e[1]}`
  );
  return `
    mutation UpdateUser {
      updateUser(data: {${data.join(",\n")}, id: ${id}) {
        ${fields.join("\n")}
      }
    }
  `;
};

export const deleteUser: UserFunction = (fields, variables) => `
mutation DeleteUser {
  deleteUser(id: ${variables?.id})
}
`;
