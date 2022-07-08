describe("renders the About page",()=>{
    it("checks the feedback section when it accepts user email and user comments" , ()=>{
        cy.visit("/About");
        cy.get('[id="filled-basic"]').should("exist").type("papa@gmail.com")
        cy.get('[id="feedback"]').should("exist").type("Agenagn is a solution for looking for house available for rent.")
        cy.get('[id="submit"]').should("exist").click()
    })
});
