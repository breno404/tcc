export const createSupplier: SupplierFunction = (fields, variables) => {
  let data: string[] = Object.entries(Object(variables)).map(
    (e) => `${e[0]}:${e[1]}`
  );
  return `
    mutation CreateSupplier {
      createSupplier(data: {${data.join(",\n")}) {
        ${fields.join("\n")}
      }
    }
  `;
};

export const updateSupplier: SupplierFunction = (fields, variables) => {
  const id = variables?.id;
  delete variables?.id;
  let data: string[] = Object.entries(Object(variables)).map(
    (e) => `${e[0]}:${e[1]}`
  );
  return `
    mutation UpdateSupplier {
      updateSupplier(data: {${data.join(",\n")}, id: ${id}) {
        ${fields.join("\n")}
      }
    }
  `;
};

export const deleteSupplier: SupplierFunction = (fields, variables) => `
mutation DeleteSupplier {
  deleteSupplier(id: ${variables?.id})
}
`;
