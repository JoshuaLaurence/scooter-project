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

  //Methods
  register(user) {
    if(this.#registeredUsers.has(user)) {
      console.log("Already registered")
    }

    if(user.age <= 17)  {
      console.log("Too young to register")
    }

    this.#registeredUsers[user.username] = {
      "password": user.password,
      "age": user.age,
      "loggedIn": false,
      "accountChange": 0
    }

    console.log("User has been registered")
  }

  logIn(username, password) {
    if (Object.keys(this.#registeredUsers).includes(username)) {
      if(this.#registeredUsers[username]["password"] === password) {
        this.#registeredUsers[username]["loggedIn"] = true
        console.log("Loggin successful")
      } else { console.log("Password incorrecy") }
    } else { console.log("This username doesn't appear to be registered with us")}
  }

  addScooter(location, scooter) {
    if (Object.keys(this._stations).includes(location)) {
      this._stations[location].push(scooter)
    } else { this._stations[location] = [scooter] }
  }

  removeScooter(scooterToRemove) {;
    /* Simple Way -->
    const ind = this._stations[scooterToRemove.location].indexOf(scooteToRemove.serial)
    if (ind === -1) {
      throw new Error("Serial number not located. Scooter has not yet been added")
    }

    this._stations[scooterToRemove.location].splice(ind, 1);
    */
    let found = false;
    for(let location of this._stations) {
      const ind = location.indexOf(scooterToRemove.serial)
      if (ind !== -1) {
        found = true;
        location.splice(ind, 1);
        console.log("Scooter successfully removed")
      }
    }

    if (!found) { throw new Error("Scooter could not be located") }
  }

}
const scoot = new ScooterApp()


module.exports = ScooterApp
