describe("Note app", function () {
  it("front page can be opened", function () {
    cy.visit("http://localhost:3001");
    cy.contains("Notes");
    cy.contains("Note app, TEJ Center ,2022");
  });
});
