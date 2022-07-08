// when user searches a specific house

describe("GET API loads the correct amount of posts per house",()=>{
    it("loads the correct amount of posts per house",()=>{

        cy.visit("http://localhost:5000")
        cy.api({
            method:'GET',
            url: '/search?q=tulu'})
    })
})
// when user searches all house to see all available houses

describe("GET API for all house",()=>{
    it("GET API for all house",()=>{
        cy.api({
            method:'GET',
            url: '/search?q='})
    })
})

// when user wants to login

describe("POST API user login",()=>{
    it("user login",()=>{
        cy.api({
            method:'POST',
            body:{
                params: {
                    email: 'girmaytadesepop@gmail.com',
                    password: 'pass'
                }
            },
            url: '/loginUser'})
    })
})


// when admin wants to login
describe("POST API Admin login",()=>{
    it("Admin login",()=>{
        cy.api({
            method:'POST',
            body:{
                params: {
                    email: 'justt@gmail.com',
                    password: 'qw'
                }
            },
            url: '/loginUser'})
    })
})

// when user wants to sign up
describe("POST API user sign up",()=>{
    it("user sign up",()=>{
        const fullDate = new Date();
        const today = {
            day: fullDate.getDate(),
            month: fullDate.getMonth(),
            year: fullDate.getFullYear(),
        };

        cy.api({
            method:'POST',
            body:{
                name:'papa',
                email: 'papa@gmail.com',
            },
            password: "pass",
            joinedDate: today,
            lastLogin: today,
            url: '/signUpUser'})
    })
})


describe("POST API user sign up",()=>{
    it("user sign up",()=>{
        const moment = require('moment');
        cy.api({
            method:'POST',
            body:{
                params: {
                    phoneNumber: '987654323',
                    description: 'wow this is amazing',
                    listingStatus:'Submitted',
                    reviewStatus:'Pending',
                    floor:'4',
                    monthlyPayment:'6000',
                    bedRoom:'4',
                    location:'Mebrathail Condominium',
                    squareMeter:'4 x 4',
                }
            },
            ownerEmail:'papa@gmail.com',
            ownerName:'papa',
            dateCreated: moment(),
            guest_house : false,
            url: '/addhouse',
            //rl:'/uploadHouseImage'
        })
    })
})


// please




