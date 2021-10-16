const auth = require("./auth")
// @ponicode
describe("auth.onSignIn", () => {
    test("0", () => {
        let callFunction = () => {
            auth.onSignIn("Elio")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction = () => {
            auth.onSignIn("elio@example.com")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction = () => {
            auth.onSignIn("Dillenberg")
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction = () => {
            auth.onSignIn(undefined)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("auth.onSignOut", () => {
    test("0", () => {
        let callFunction = () => {
            auth.onSignOut()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("auth.isSignedIn", () => {
    test("0", () => {
        let callFunction = () => {
            auth.isSignedIn()
        }
    
        expect(callFunction).not.toThrow()
    })
})
