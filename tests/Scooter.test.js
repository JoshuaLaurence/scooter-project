const Scooter = require('../src/Scooter')
const User = require('../src/User')

const logg = jest.spyOn(console, "log").mockImplementation(() => {})

const currentUser = new User("J0sH", "wowwhatagreatpassword", 19)
const scooter = new Scooter("Manchester", currentUser)
//typeof scooter === object
describe('Scooter Object', () => {


  test('Check static method is logging all previous serial numbers', () => {
    expect(Scooter.usedSerials).toEqual(new Set([scooter.serial]))
  })
  test('Unique serial function works', () => {
    const serial = Scooter.generateUniqueSerial(Scooter.usedSerials, false)
    expect(Scooter.usedSerials.has(serial)).toBeTruthy()
    expect(serial >= 0 && serial <= 1000).toBeTruthy()
  });

  test('Unique serial function works', () => {
    const serial = Scooter.generateUniqueSerial(Scooter.usedSerials, true)
    expect(logg).toHaveBeenCalledWith("Serial is already in use")
  });

  test('Check the scooter station has been constructed', () => {
    expect(scooter.station).toEqual("Manchester");
  })
  test('Check the scooter user has been constructed', () => {
    expect(scooter.user).toEqual(currentUser);
  })
  test('Check the scooter serial is within range', () => {
    expect(scooter.serial >= 0 && scooter.serial <= 1000).toBeTruthy()
  })
  test('Check the scooter charge is within range', () => {
    expect(scooter.charge >= 0 && scooter.charge <= 100).toBeTruthy()
  })
  test('Check the scooter range has been constructed properly',() => {
    expect(scooter.range).toEqual(16)
  })
  test('Check the isBroken variable is set to false', () => {
    expect(scooter.isBroken).toEqual(false)
  })
  test('Check the docked variable is set to true', () => {
    expect(scooter.docked).toEqual(true)
  })

  test('Testing isBroken setter works', () => {
    scooter.isBroken = true
    expect(scooter.isBroken).toBeTruthy()
    scooter.isBroken = false
  });
  test('Testing charge setter works, while also adapting the range value', () => {
    scooter.charge = 25
    expect(scooter.charge).toEqual(25)
    expect(scooter.range).toEqual(8)
  });
})


//Method tests
describe('Scooter Methods', () => {
  // tests here
  //rent method
  test('Check if rent method is functioning properly', () => {
    scooter.charge = 50
    scooter.rent()
    expect(logg).toHaveBeenCalledWith("Enjoy the ride!")
  });
  test("Check if error is thrown when battery percentage is below 20", () => {
    scooter.charge = 15
    expect(() => {scooter.rent()}).toThrow("Scooter low on battery, please charge.")
  })
  test("Check if error is thrown when isBroken is set to true", () => {
    scooter.charge = 50
    scooter.isBroken = true
    expect(() => {scooter.rent()}).toThrow("Scooter is broken, please send a repair request.")
  })
  scooter.isBroken = false
  scooter.charge = 50
  //dock method
  test('Check if dock method is functioning properly', () => {
    scooter.dock("Liverpool")
    expect(scooter.docked).toEqual(true)
    expect(scooter.user).toEqual("")
    expect(scooter.station).toEqual("Liverpool")
  });

  test('Check if dock method handles not being given an argument properly', () => {
    expect(() => {scooter.dock()}).toThrow("Docking Station Required!")
  });
  //charge method
  test("Charge Working accuratly", async () => {
    await scooter.recharge(); // we need to wait for the charge!
    expect(scooter.charge).toBe(100);
    expect(scooter.range).toBe(32)
  });

  //requestRepair method
  test("Request Repair Working accuratly", async () => {
    await scooter.requestRepair(); // we need to wait for the charge!
    expect(logg).toHaveBeenCalledWith("Repair Requested")
    expect(scooter.isBroken).toEqual(false)
  });
})
