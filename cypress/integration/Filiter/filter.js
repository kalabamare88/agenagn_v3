describe("'it will render correctly for the monthly rent", () => {
    it("gives the correct filtered data", () => {
        cy.visit("http://localhost:3001/search?q=&=&=&=&=false");
        cy.wait(2000)
        cy.contains("Monthly Payment").should('exist')
        cy.wait(2000)
        // just filter it by index for the monthly rent
        cy.get('input[type="checkbox"]')
            .each(($elem, index) => {
                if (index === 3) {
                    cy.wrap($elem).click();
                }
            })
        // just filter it by index

        cy.wait(4000)
    })
});




describe("'it will render correctly for the location of the house", () => {
    it("gives the correct filtered data", () => {

        cy.contains("Location of Condominium").should('exist').click()
        // just filter it by index
        cy.get('[data-cy=content]')
            .each(($elem, index) => {
                if (index === 3) {
                    cy.wrap($elem).click();
                }
            })
        // just filter it by index
        cy.wait(3000)
    })
});



describe("'it will render correctly for the bedroom part", () => {
    it("gives the correct filtered data", () => {
        cy.contains("Number of Bedrooms").should('exist').click()
        cy.wait(2000)
        // just filter it by index
        cy.get('[data-cy=content1]')
            .each(($elem, index) => {
                if (index === 1) {
                    cy.wrap($elem).click();
                }
            })
        // just filter it by index
        cy.wait(2000)
    })
});




// then the filter
describe("'it will render correctly for all the posted houses", () => {
    it("gives the correct filtered data", () => {
        cy.visit("http://localhost:3001/search?q=&=&=&=&=false");
        cy.wait(2000)
        cy.contains("Monthly Payment").should('exist')
        cy.wait(2000)
        // just filter it by index for the monthly rent
        cy.get('input[type="checkbox"]')
            .each(($elem, index) => {
                if (index === 3) {
                    cy.wrap($elem).click();
                }
            })
        // just filter it by index

        cy.wait(4000)
    })
});



