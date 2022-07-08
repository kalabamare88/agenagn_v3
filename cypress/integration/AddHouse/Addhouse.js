describe("it renders correctly", () => {

    it("first go to login", () => {
        cy.visit("/Login")
        cy.wait(3000)
        cy.get('[id="email"]').should("exist")
            .type('girmaytadesepop@gmail.com')

        cy.get('[id="password"]').should("exist")
            .type('pass')
        cy.get("#login")
            .click()
        cy.wait(4000)
        cy.get("#addNewHouse")

        cy.wait(3000)
        cy.visit("/addhouse")

        cy.contains("Location of the Condominium")
        cy.get('input[name="Myname"]')
            .type('4 kilo Condominium')

        // select number of bed rooms
        cy.get('select[name="selectNumberOfBedrooms"]')
            .select('2')
            // confirm the selected value
            .should('have.value', '2')

        // select number of floor
        cy.get('select[name="selectNumberOfFloor"]')
            .select('4')
            // confirm the selected value
            .should('have.value', '4')
        // type the monthly payment
        cy.get('input[name="payment"]')
            .type('34000')

        //select the number of Square Meters

        cy.get('input[name="SquareMeter"]')
            .type('4 x 4')
            // confirm the selected value
            .should('have.value', '4 x 4')

        // date picker

        // cy.get('input[name="date"]').click('10-09-2021').should('have.value', '10-09-2021')

        cy.get('input[name="date"]').invoke('val').then((text) => {
            expect('27-09-2021').to.equal(text);
        });

        // write the phone number
        cy.get('input[name="phone"]')
            .type("940651252")

        //  upload images

        cy.wait(3000)

        cy.get('[data-cy=content]')
            .attachFile('image/4.jpg', {subjectType: 'drag-n-drop'}) // image 1
        cy.wait(3000)


        cy.get('[data-cy=content]')
            .attachFile('image/14.jpg', {subjectType: 'drag-n-drop'}) // image 2
        cy.wait(3000)


        cy.get('[data-cy=content]')
            .attachFile('image/5.jpg', {subjectType: 'drag-n-drop'}) // image 3
        cy.wait(3000)

        cy.get('[data-cy=content]')
            .attachFile('image/8.jpg', {subjectType: 'drag-n-drop'})  //image 4
        cy.wait(3000)

        cy.get('[data-cy=content]')
            .attachFile('image/9.jpg', {subjectType: 'drag-n-drop'})  // image 5
        cy.wait(3000)
        // let's check whether it is guest house or not


        cy.get('input[name="guestRadio"]')
            .check('no')
        cy.wait(3000)
        cy.get('input[name="guestRadio"]')
            .check('yes')
        cy.wait(3000)
// Short description (optional)
        cy.get('textarea[name="shortDescription"]')
            .type("this is my best house ever. so please use this opportunity")

// finally click the submit button then redirect to the home page

        cy.wait(2000)

        cy.get('[id="submit"]').should("exist").click()

        cy.wait(6000)

    })

    // finally user can search his house if the admin approved him/her
    it("can accept user input and can show the result ", () => {
        cy.visit('http://localhost:3001/');
        cy.get('[id="search"]').should("exist").type("condominium{enter}")
    })

})
