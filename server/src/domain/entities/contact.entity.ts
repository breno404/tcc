class Contact {
  #id: string;
  #name: string;
  #email: string;
  #phone: string;

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

  get email() {
    return this.#email
  }

  set email(email: string) {
    this.#email = email
  }

  get phone() {
    return this.#phone
  }

  set phone(phone: string) {
    this.#phone = phone
  }

  constructor(id: string, name: string, email: string, phone: string) {
    this.#id = id
    this.#name = name
    this.#email = email
    this.#phone = phone
  }
}

export default Contact;
