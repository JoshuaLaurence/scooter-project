const Scooter = require('../src/Scooter')
const User = require('../src/User')
const ScooterApp = require('../src/ScooterApp')
const { scooterSessions } = require('../src/ScooterApp')

const logg = jest.spyOn(console, "log").mockImplementation(() => {})
const scootApp = new ScooterApp()
// ScooterApp tests here
describe("ScooterApp Object", () => {
    //Test construction
    test('registeredUsers is constructing properly', () => {
        expect(scootApp.registeredUsers).toEqual({"Bobs":  {"accountChange": 0,"age": 74,"loggedIn": false,"password": "y0urUncle"}}) //Because it has been registered in a later describe block
    });

    test('stations is constructing properly', () => {
        expect(scootApp.stations).toEqual({"London": [], "Manchester": [], "Liverpool": [], "Tottenham": [], "Dover": [], "Milton Keines": []})
    });

    test('Checking static counter works', () => {
        expect(ScooterApp.scooterSessions).toEqual([{"_stations": {"London": [], "Manchester": [], "Liverpool": [], "Tottenham": [], "Dover": [], "Milton Keines": []}}])
    });
})

describe("ScooterApp Methods", () => {
    // register user
    const testUser = new User("Bobs", "y0urUncle", 74)
    test("Registered Users is functioning properly", () => {
        scootApp.register(testUser)
        expect(logg).toHaveBeenCalledWith("User has been registered")
    })
    test("User registereing is already registered", () => {
        scootApp.registeredUsers[testUser.username] = {"password": testUser.password, "age": testUser.age, "loggedIn": false,
        "accountChange": 0}
        scootApp.register(testUser)
        expect(logg).toHaveBeenCalledWith("Already registered")
    })
    test("User registereing is too young", () => {
        const newTestUsr = new User("George Washington", "Ind3npence", 13)
        scootApp.register(newTestUsr)
        expect(logg).toHaveBeenCalledWith("Too young to register")
    })
    // log in
    scootApp.register(testUser)
    test('Login function is functioning properly', () => {
        scootApp.logIn(testUser.username, testUser.password)
        expect(logg).toHaveBeenCalledWith("Loggin successful")
    });
    test("User isn't yet registered", () => {
        const newTestUsr = new User("Hello", "w0rld", 28)
        expect(() => {scootApp.logIn(newTestUsr.username, newTestUsr.password)}).toThrow("Username or password is incorrect")
    })
    test("Username or password inputted is incorrect", () => {
        expect(() => {scootApp.logIn(testUser.username, "chickenWings")}).toThrow("Username or password is incorrect")
    })

    // add scooter
    test('Adding Scooter function is functioning properly', () => {
        const newUser = new User("random", "password", 78)
        const testScoot = new Scooter("Liverpool", newUser)
        scootApp.addScooter("Liverpool", testScoot)
        expect(scootApp.stations["Liverpool"]).toEqual([testScoot])
    });
    // remove scooter
    test('Remove Scooter function is functioning properly', () => {
        const scootApp2 = new ScooterApp()
        const newUser = new User("random", "password", 78)
        const testScoot = new Scooter("Liverpool", newUser)
        scootApp2.addScooter("Liverpool", testScoot)
        scootApp2.removeScooter(testScoot)
        expect(logg).toHaveBeenCalledWith("Scooter successfully removed")
    });
    test('Remove Scooter function with false scooter', () => {
        const falseUser = new User("ab", "cd", 97)
        const falseScooter = new Scooter("Liverpool", falseUser)
        expect(() => {scootApp.removeScooter(falseScooter)}).toThrow("Serial number not located. Scooter has not yet been added")
    });
    //BONUS --> Logging broken scooter
    test("Mark scooter as broken", async () => {
        const newUser = new User("random", "password", 78)
        const testScoot = new Scooter("Liverpool", newUser)
        scootApp.addScooter("Liverpool", testScoot)
        await scootApp.scooterBroken(testScoot)
        expect(logg).toHaveBeenCalledWith("Repair Requested")
    })
})
