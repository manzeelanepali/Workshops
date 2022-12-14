describe("Note app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    const user = {
      name: "sunaina synagboo",
      username: "Mahes",
      password: "Nepali",
    };
    cy.request("POST", "http://localhost:3001/api/users/", user);
    cy.visit("http://localhost:3000");
  });

  it("front page can be opened", function () {
    cy.contains("Notes");
    cy.contains("Note app, TEJ Center ,2022");
  });

  it("login form can be opened", function () {
    cy.contains("login").click();
  });

  it("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("Mahes");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    cy.contains("Wrong credentials");
  });

  it("user can log in", function () {
    cy.contains("login").click();
    cy.get("#username").type("Mahes");
    cy.get("#password").type("Nepali");
    cy.get("#login-button").click();

    cy.contains("sunaina synagboo logged-in");
  });
  describe("when logged in", function () {
    beforeEach(function () {
      cy.login({ username: "Mahes", password: "Nepali" });
    });
    it("a new note can be created", function () {
      cy.contains("new note").click();
      cy.get("input").type("a note created by cypress");
      cy.contains("save").click();
      cy.contains("a note created by cypress");
    });
    describe("when logged in", function () {
      describe("and several notes exist", function () {
        beforeEach(function () {
          cy.createNote({ content: "first note", important: false });
          cy.createNote({ content: "second note", important: false });
          cy.createNote({ content: "third note", important: false });
        });

        it("one of those can be made important", function () {
          cy.contains("second note").contains("make important").click();

          cy.contains("second note").contains("make not important");
        });
      });
    });
  });
});
