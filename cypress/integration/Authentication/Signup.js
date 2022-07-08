describe("renders Authentication Signup page",()=>{

    it("accepts user input and can register",()=>{ // new user can register
        cy.visit("/Signup")
        cy.get('#name')
            .type('cmd')
        cy.get('#email')
            .type('cmd@gmail.com')
        cy.get("#password")
            .type('pass')
        cy.get('input[name="confirmPassword"]')
            .type('pass')
        cy.get("#check")
            .click()
        cy.get("#SignUp")
            .click()
        cy.wait(9000)
    })
});


describe("if user already have an account, user see that, he/she has existed account",()=>{
   // existed user can not be registered again
    it(" it raises an error of (The email that you have provided is already in use.) ",()=>{
        cy.visit("/Signup")
        cy.get('#name')
            .type('kalab')
        cy.get('#email')
            .type('kalab@gmail.com')
        cy.get("#password")
            .type('pass')
        cy.get('input[name="confirmPassword"]')
            .type('pass')
        cy.get("#check")
            .click()
        cy.get("#SignUp")
            .click()
        cy.wait(8000)
        cy.get("#goToLogin")
            .click()
        // here is the login page
        cy.get('#email')
            .type('cmd@gmail.com')
        cy.get("#password")
            .type('pass')
        cy.get("#login")
            .click()
        cy.wait(9000)
    })
})

