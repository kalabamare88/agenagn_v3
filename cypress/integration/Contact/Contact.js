describe("We are searching for you! Let’s get in touch!",()=>{
    it("We are searching for you! Let’s get in touch!" , ()=>{
        cy.visit("/contact");
        cy.contains("We are searching for you! Let’s get in touch!");
    })

    it("accepts user contact information and he/she can submit his/her information to us",()=>{
        cy.get('[id="name"]').should("exist").type("papa")
        cy.get('[id="email"]').should("exist").type("papa@gmail.com")
        cy.get('[id="phone"]').should("exist").type("0940651252")
        cy.get('[id="company"]').should("exist").type("Ethio Hack")
        cy.get('[id="country"]').should("exist").type("Ethiopia")
        cy.get('[id="submit"]').should("exist").click()
    })
});




