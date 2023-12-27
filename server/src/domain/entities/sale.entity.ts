import moment from "moment";

class Sale {
  #id: string
  #userId: string
  #customerId: string
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

  get customerId() {
    return this.#customerId
  }

  set customerId(customerId: string) {
    this.#customerId = customerId
  }

  get date() {
    return this.#date
  }

  set date(date: string) {
    this.#date = moment.utc(date).format();
  }

  constructor(id: string, userId: string, customerId: string, date: string) {
    this.#id = id
    this.#userId = userId
    this.#customerId = customerId
    this.date = date
  }
}

export default Sale;