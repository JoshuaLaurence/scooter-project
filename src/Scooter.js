const User = require("./User");

class Scooter{
  #user
  static usedSerials = new Set()
  static generateUniqueSerial(serials, testing) {
    let newSerial = Math.round(Math.random() * 1000);
    if (testing) {
      newSerial = 4
      Scooter.usedSerials.add(newSerial)
    }
    let unique = false
    while (!unique){
      if (serials.has(newSerial) === false) {
        unique = true
        serials.add(newSerial)
        return newSerial
      } else {
        console.log("Serial is already in use")
        newSerial = Math.round(Math.random() * 1000);
      }
    }
  }

  constructor(station, user) {
    this._station = station
    this.#user = user
    this._serial = Scooter.generateUniqueSerial(Scooter.usedSerials, false)
    this._charge = Math.round(Math.random() * 100)
    this._range = (this._charge / 100 * 32).toFixed(1)
    this._isBroken = false
    this._docked = true
  }

  //Getters
  get station() {return this._station}
  get user() {return this.#user}
  get serial() {return this._serial}
  get charge() {return this._charge}
  get isBroken() {return this._isBroken}
  get docked() {return this._docked}
  get range() {return this._range}


  //Setters, for testing purposes only
  set isBroken(state) {this._isBroken = state}
  set charge(percentage) {
    this._charge = percentage
    this._range = percentage / 100 * 32
  }

  //Methods
  rent() {
    if (this._isBroken === false && this._charge > 20) {
      console.log("Enjoy the ride!")
    } else if (this._charge <= 20){
      throw new Error("Scooter low on battery, please charge.")
    } else {
      throw new Error("Scooter is broken, please send a repair request.")
    }
  }

  dock(dockStation) {
    if (dockStation === undefined) {
      throw new Error("Docking Station Required!")
    }
    this._station = dockStation
    this._docked = true
    this.#user = ""
  }

  async recharge() {
    console.log('Starting charge');

    await new Promise(resolve => setTimeout(resolve, 2000)); // wait 2 seconds
    this._charge = 100
    this._range = 32
    console.log('Charge complete');
  }

  async requestRepair() {
    console.log("Requesting Repair")
    await new Promise(resolve => setTimeout(resolve, 2000));
    this._isBroken = false
    console.log("Repair Requested")
  }
}
module.exports = Scooter
