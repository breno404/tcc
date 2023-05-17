export const customers: CustomerFunction = (fields) => `
query Customers {
  customers {
    ${fields.join("\n")}
  }
}
`;

export const customerById: CustomerFunction = (fields, variables) => `
query CustomerById {
  customer:customerById(id: "${variables?.id}") {
    ${fields.join("\n")}
  }
}
`;

export const customerByCnpj: CustomerFunction = (fields, variables) => `
query CustomerByCnpj {
  customer:customerByCnpj(cnpj: "${variables?.cnpj}") {
    ${fields.join("\n")}
  }
}
`;

export const customerByName: CustomerFunction = (fields, variables) => `
query CustomerByName {
  customer:customerByName(name: "${
    variables?.fantasyName || variables?.companyName
  }") {
    ${fields.join("\n")}
  }
}
`;
