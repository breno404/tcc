abstract class LegalEntity {
  #id: string
  #companyName: string
  #fantasyName: string
  #cnae: string
  #cnpj: string
  #entityType: string

  get id() {
    return this.#id
  }

  set id(id: string) {
    this.#id = id
  }

  get companyName() {
    return this.#companyName
  }

  set companyName(companyName: string) {
    this.#companyName = companyName
  }

  get fantasyName() {
    return this.#fantasyName
  }

  set fantasyName(fantasyName: string) {
    this.#fantasyName = fantasyName
  }

  get cnae() {
    return this.#cnae
  }

  set cnae(cnae: string) {
    this.#cnae = cnae
  }

  get cnpj() {
    return this.#cnpj
  }

  set cnpj(cnpj: string) {
    this.#cnpj = cnpj
  }

  get entityType() {
    return this.#entityType
  }

  set entityType(entityType: string) {
    this.#entityType = entityType
  }

  constructor(id: string, companyName: string, fantasyName: string, cnae: string, cnpj: string, entityType: string) {
    this.#id = id
    this.#companyName = companyName
    this.#fantasyName = fantasyName
    this.#cnae = cnae
    this.#cnpj = cnpj
    this.#entityType = entityType

  }
}

export default LegalEntity;