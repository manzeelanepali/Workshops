describe("Note app", function () {
  beforeEach(function () {
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("Note app, TEJ Center ,2022");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("user can log in", function () {
    cy.contains("login").click();
    cy.get("#username").type("Mahes");
    cy.get("#password").type("Nepali");
    cy.get("#login-button").click();

    cy.contains("sunaina synagboo logged-in");
  });
});
