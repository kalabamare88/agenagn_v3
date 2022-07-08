describe("renders UserDashboard page",()=>{

    it("accepts and validates user input when trying to login",()=>{
        cy.visit("/Login")
        cy.get('#email')
            .type('girmaytadesepop@gmail.com')
        cy.get("#password")
            .type('papa')
        cy.get("#login")
            .click()
        cy.contains("Account Info")
    })

});
