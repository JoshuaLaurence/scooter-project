const User = require('./User')
const Scooter = require('./Scooter')

class ScooterApp {
  // ScooterApp code here
  #registeredUsers
  static scooterSessions = []
  constructor() {
    this._stations = {"London": [], "Manchester": [], "Liverpool": [], "Tottenham": [], "Dover": [], "Milton Keines": []}
    this.#registeredUsers = {}

    ScooterApp.scooterSessions.push(this)
  }

  //Getters
  get stations() {return this._stations}
  get registeredUsers() {return this.#registeredUsers}



}
const scoot = new ScooterApp()

console.log(ScooterApp.scooterSessions)

module.exports = ScooterApp
