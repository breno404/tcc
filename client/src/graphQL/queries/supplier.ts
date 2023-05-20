export const suppliers: SupplierFunction = (fields) => `
query Suppliers {
  suppliers {
    ${fields.join("\n")}
  }
}
`;

export const supplierById: SupplierFunction = (fields, variables) => `
query SupplierById {
  supplier:supplierById(id: "${variables?.id}") {
    ${fields.join("\n")}
  }
}
`;

export const supplierByCnpj: SupplierFunction = (fields, variables) => `
query SupplierByCnpj {
  supplier:supplierByCnpj(cnpj: "${variables?.cnpj}") {
    ${fields.join("\n")}
  }
}
`;

export const supplierByName: SupplierFunction = (fields, variables) => `
query SupplierByName {
  supplier:supplierByName(name: "${
    variables?.fantasyName || variables?.companyName
  }") {
    ${fields.join("\n")}
  }
}
`;
