/// <reference types="cypress" />


describe("here i write all my test case",()=>{
    let randomString=Math.random().toString(36).substring(2);
    let username = "Auto" + randomString;
    let email = "Auto_email" + randomString + "@gmail.com";
    let password="Password1";

    it("Test valid Signup",()=>{
        cy.intercept("POST","**/*.realworld.io/api/users").as("newUser");

        cy.visit("https://angular.realworld.io/");
        cy.get(".nav-link").contains('Sign up').click();
        cy.get("[placeholder='Username']").type("Auto"+randomString);
        cy.get("[placeholder='Email']").type("Auto_email"+randomString+"@gmail.com");
        cy.get("[placeholder='Password']").type(password);
        cy.get("button").contains("Sign up").click();

        cy.wait("@newUser").then(({request, response}) => {
            cy.log("Request: " + JSON.stringify(request));
            cy.log("Response: " + JSON.stringify(response));
           if(response){
            expect(response.statusCode).to.eq(201);
            expect(request.body.user.username).to.eq(username);
            expect(request.body.user.email).to.eq(email);
                     }          
        })
            });
                        //here i write the testcase for the sign in concept
it("sign in test",()=>{
                // here i also add the tags in the tags columns
                cy.intercept("GET","**/tags",{
                    fixture:'popularTags.json'
                })
                cy.visit("https://angular.realworld.io/");
                cy.get(".nav").contains("Sign in").click();
                cy.get("[placeholder='Email']").type(email);
                cy.get("[placeholder='Password']").type(password);
                cy.get("button").contains("Sign in").click();
                cy.get(':nth-child(4) > .nav-link').contains(username);
                cy.wait(5000);
                cy.get('.tag-list').should('contain',"JavaScript").and('contain',"automation-testing").and('contain',"cypress").and('contain',"nodejs")
});
// here i write the third test case 
it("Mock global feed data", () => {
    // fixture is basically used for the adding the data into the paricular api
    cy.intercept("GET", "**/api/articles*", {fixture: 'testArticles.json'}).as("articles");
    cy.visit("https://angular.realworld.io/");
    cy.get(".nav").contains("Sign in").click();
    cy.get("[placeholder='Email']").type(email);
    cy.get("[placeholder='Password']").type(password);
    cy.get("button").contains("Sign in").click();
    cy.get(':nth-child(4) > .nav-link').contains(username);
    cy.wait("@articles");
});
})