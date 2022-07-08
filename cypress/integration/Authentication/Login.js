describe("renders Authentication login page",()=>{


    it("accepts user input",()=>{
        cy.visit("/Login")
        cy.get('#email')
            .type('cmd@gmail.com')
        cy.get("#password")
            .type('pass')
        cy.get("#login")
            .click()
        cy.wait(9000)
    })
});


describe(" if the user inputs are incorrect the system does't accept it ",()=>{

    // shows error on the login page
    it(" shows an error of (Incorrect Username or Password! then he/she can go to register page) ",()=>{
        cy.visit("/Login")
        cy.get('#email')
            .type('cmd@gmail.com')
        cy.get("#password")
            .type('pass1')  // incorrect password
        cy.get("#login")
            .click()
        cy.wait(9000)
        cy.get("#gotoSignup")
            .click()
    })

    // user will be redirected to the register page and can have an account of the above information

    it(" now user can go to register page",()=>{
        cy.get('#name')
            .type('girma')
        cy.get('#email')
            .type('pop@gmail.com')
        cy.get("#password")
            .type('pass1')
        cy.get('input[name="confirmPassword"]')
            .type('pass1')
        cy.get("#check")
            .click()
        cy.get("#SignUp")
            .click()
        cy.wait(9000)

        cy.get("#goToLogin")
            .click()    // now user can logged in to the system using the above information
    })
})
