export const createProduct: ProductFunction = (fields, variables) => {
  let data: string[] = Object.entries(Object(variables)).map(
    (e) => `${e[0]}:${e[1]}`
  );
  return `
    mutation CreateProduct {
      createProduct(data: {${data.join(",\n")}) {
        ${fields.join("\n")}
      }
    }
  `;
};

export const updateProduct = (fields: SupplierAttribute[]) => gql`
    mutation UpdateProduct {
      updateProduct(data: $data, id: $id) {
        ${fields.join("\n")}
      }
    }
  `;
