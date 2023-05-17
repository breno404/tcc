export const createCustomer: CustomerFunction = (fields, variables) => {
  let data: string[] = Object.entries(Object(variables)).map(
    (e) => `${e[0]}:${e[1]}`
  );
  return `
    mutation CreateCustomer {
      createCustomer(data: {${data.join(",\n")}) {
        ${fields.join("\n")}
      }
    }
  `;
};

export const updateCustomer: CustomerFunction = (fields, variables) => {
  const id = variables?.id;
  delete variables?.id;
  let data: string[] = Object.entries(Object(variables)).map(
    (e) => `${e[0]}:${e[1]}`
  );
  return `
    mutation UpdateCustomer {
      updateCustomer(data: {${data.join(",\n")}, id: ${id}) {
        ${fields.join("\n")}
      }
    }
  `;
};

export const deleteCustomer: CustomerFunction = (fields, variables) => `
mutation DeleteCustomer {
  deleteCustomer(id: ${variables?.id})
}
`;
