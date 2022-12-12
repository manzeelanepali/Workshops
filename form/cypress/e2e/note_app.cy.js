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
    it("user can login", function () {
      cy.contains("login").click();
      cy.get("input:first").type("mluukkai");
      cy.get("input:last").type("salainen");
    });
  });
});
