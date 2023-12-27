class Inventory {
  #id: string;
  #quantity: number;
  #productId: string;

  get id() {
    return this.#id
  }

  set id(id: string) {
    this.#id = id
  }

  get quantity() {
    return this.#quantity
  }

  set quantity(quantity: number) {
    this.#quantity = quantity
  }

  get productId() {
    return this.#productId
  }

  set productId(productId: string) {
    this.#productId = productId
  }

  constructor(id: string,
    quantity: number,
    productId: string) {
    this.#id = id
    this.#quantity = quantity
    this.#productId = productId

  }
}

export default Inventory;
