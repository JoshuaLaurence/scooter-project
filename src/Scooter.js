class Scooter{
  #user
  static usedSerials = new Set()
  static generateUniqueSerial(serials) {
    let newSerial = Math.floor(Math.random() * 1000);
    let unique = False
    while (!unique){
      if (serials.has(newSerial)) {
        unique = true
        serials.add(newSerial)
        return newSerial
      }
      newSerial = Math.round(Math.random() * 1000);
    }
  }

  constructor(station, user) {
    this._station = station
    this.#user = user
    this._serial = Scooter.generateUniqueSerial(Scooter.uniqueSerials)
    this._charge = Math.round(Math.random() * 100)
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


  //Methods
  rent() {
    if (this._isBroken === false && this._charge > 20) {
      console.log("Enjoy the ride")
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

    console.log('Charge complete');
  }

  requestRepair() {
    console.log("Requesting Repair")
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log("Repair Requested")
  }
}


module.exports = Scooter
