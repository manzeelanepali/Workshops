describe("Note app", function () {
  describe("Note app", function () {
    beforeEach(function () {
      cy.visit("http://localhost:3001");
    });

    it("front page can be opened", function () {
      cy.visit("http://localhost:3001");
      cy.contains("Notes");
      cy.contains("Note app, TEJ Center ,2022");
    });

    it("login form can be opened", function () {
      cy.visit("http://localhost:3001");
      cy.contains("login").click();
    });
    it("user can log in", function () {
      cy.contains("login").click();
      cy.get("#username").type("mluukkai");
      cy.get("#password").type("salainen");
      cy.get("#login-button").click();

      cy.contains("Matti Luukkainen logged in");
    });
  });
});
