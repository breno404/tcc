class Product {
  #id: string;
  #name: string;
  #description: string;
  #categoryId: string;

  get id() {
    return this.#id
  }

  set id(id: string) {
    this.#id = id
  }
  get name() {
    return this.#name
  }

  set name(name: string) {
    this.#name = name
  }

  get description() {
    return this.#description
  }

  set description(description: string) {
    this.#description = description
  }

  get categoryId() {
    return this.#categoryId
  }

  set categoryId(categoryId: string) {
    this.#categoryId = categoryId
  }

  constructor(id: string, name: string, description: string, categoryId: string) {
    this.#id = id
    this.#name = name
    this.#description = description
    this.#categoryId = categoryId
  }
}

export default Product;
