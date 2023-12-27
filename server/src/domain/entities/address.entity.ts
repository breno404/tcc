class Address {
  #id: string;
  #cep: string;
  #city: string;
  #district: string;
  #street: string;
  #number: string;

  get id() {
    return this.#id
  }

  set id(id: string) {
    this.#id = id
  }
  get cep() {
    return this.#cep
  }

  set cep(cep: string) {
    this.#cep = cep
  }

  get city() {
    return this.#city
  }

  set city(city: string) {
    this.#city = city
  }

  get street() {
    return this.#street
  }

  set street(street: string) {
    this.#street = street
  }

  get number() {
    return this.#number
  }

  set number(number: string) {
    this.#number = number
  }

  get district() {
    return this.#district
  }

  set district(district: string) {
    this.#district = district
  }

  constructor(id: string, cep: string, city: string, district: string, street: string, number: string) {
    this.#id = id
    this.#cep = cep
    this.#city = city
    this.#district = district
    this.#street = street
    this.#number = number
  }
}

export default Address;
