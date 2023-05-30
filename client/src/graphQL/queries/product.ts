export const products: ProductFunction = (fields) => `
query Products {
  products {
    ${fields.join("\n")}
  }
}
`;

export const productById: ProductFunction = (fields, variables) => `
query ProductById {
  product:productById(id: "${variables?.id}") {
    ${fields.join("\n")}
  }
}
`;

