const User = require('../src/User')

// User tests here
describe("User Object", () => {
    const newUser = new User("name", "pass123456789", 22)
    //test username
    test("Check username is correctly constructed", () => {
        expect(newUser.username).toEqual("name");
    })
    //test password
    test("Check password is correctly constructed", () => {
        expect(newUser.password).toEqual("pass123456789");
    })
    //test age
    test("Check age is correctly constructed", () => {
        expect(newUser.age).toEqual(22);
    })
})
