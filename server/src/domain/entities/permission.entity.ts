class Permission {
  #id: string;
  #parentId: string;
  #name: string;

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

  get parentId() {
    return this.#parentId
  }

  set parentId(parentId: string) {
    this.#parentId = parentId
  }

  constructor(id: string, name: string, parentId: string) {
    this.#id = id
    this.#name = name
    this.#parentId = parentId
  }
}

export default Permission;
