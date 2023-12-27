import moment from "moment";

class Purchase {
  #id: string
  #userId: string
  #supplierId: string
  #date: string;

  get id() {
    return this.#id
  }

  set id(id: string) {
    this.#id = id
  }

  get userId() {
    return this.#userId
  }

  set userId(userId: string) {
    this.#userId = userId
  }

  get supplierId() {
    return this.#supplierId
  }

  set supplierId(supplierId: string) {
    this.#supplierId = supplierId
  }

  get date() {
    return this.#date
  }

  set date(date: string) {
    this.#date = moment.utc(date).format();
  }

  constructor(id: string, userId: string, supplierId: string, date: string) {
    this.#id = id
    this.#userId = userId
    this.#supplierId = supplierId
    this.date = date
  }
}

export default Purchase;