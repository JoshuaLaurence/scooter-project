class User {
  // User code here
  #username
  #password
  #age

  constructor(username, password, age) {
    this.#username = username
    this.#password = password
    this.#age = age
  }

  //Getters
  get username() {return this.#username}
  get password() {return this.#password}
  get age() {return this.#age}
}

module.exports = User
