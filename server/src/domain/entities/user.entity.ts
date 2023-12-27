class User {
  #id: string
  #userName: string
  #name: string
  #lastName: string
  #email: string
  #password: string
  #active: boolean

  get id() {
    return this.#id
  }

  set id(id: string) {
    this.#id = id
  }

  get userName() {
    return this.#userName
  }

  set userName(userName: string) {
    this.#userName = userName
  }

  get name() {
    return this.#name
  }

  set name(name: string) {
    this.#name = name
  }

  get lastName() {
    return this.#lastName
  }

  set lastName(lastName: string) {
    this.#lastName = lastName
  }

  get active() {
    return this.#active
  }

  set active(active: boolean) {
    this.#active = active
  }

  get password() {
    return this.#password
  }

  set password(password: string) {
    this.#password = password
  }

  get email() {
    return this.#email
  }

  set email(email: string) {
    this.#email = email
  }

  constructor(id: string, userName: string, name: string, lastName: string, email: string, password: string, active: boolean) {
    this.#id = id
    this.#userName = userName
    this.#name = name
    this.#lastName = lastName
    this.#email = email
    this.#password = password
    this.#active = active
  }
}

export default User;
