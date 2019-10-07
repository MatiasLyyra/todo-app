/// <reference types="Cypress" />

describe("Todo items", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  context("Add todos", () => {
    it("should accept new todos from submit button", () => {
      cy.get(".todo-form input[name=todo-name]")
        .type("Write more tests")
        .get(".todo-form button[type=submit]")
        .click();
      cy.get(".todos > *")
        .eq(0)
        .get(".todo-name")
        .should("have.value", "Write more tests")
        .should("not.have.class", "completed");
    });

    it("should accept new todos from enter", () => {
      cy.get(".todo-form input[name=todo-name]").type(
        "Write even more tests{enter}"
      );
      cy.get(".todos > *")
        .eq(0)
        .get(".todo-name")
        .should("have.value", "Write even more tests")
        .should("not.have.class", "completed");
    });

    it("should accept multiple todos", () => {
      cy.get(".todo-form input[name=todo-name]")
        .type("Write even more tests{enter}")
        .type("I probably forgot something already...{enter}");
      cy.get(".todos .todo .todo-name")
        .eq(0)
        .should("have.value", "Write even more tests");
      cy.get(".todos .todo .todo-name")
        .eq(1)
        .should("have.value", "I probably forgot something already...");
    });

    it("should not add todo with empty name", () => {
      cy.get(".todo-form button[type=submit]").click();
      cy.get(".todo-form").submit();
      cy.get(".todos")
        .children()
        .should("have.length", 0);
    });
  });

  context("Toggle todos", () => {
    beforeEach(() => {
      cy.get(".todo-form input[name=todo-name]")
        .type("Write even more tests{enter}")
        .type("I probably forgot something already...{enter}");
    });

    it("should toggle todo when clicked", () => {
      cy.get(".todos > *")
        .eq(1)
        .click();
      cy.get(".todos .todo")
        .eq(1)
        .should("have.class", "completed");
      cy.get(".todos > *")
        .eq(1)
        .click();
      cy.get(".todos .todo")
        .eq(1)
        .should("not.have.class", "completed");
    });

    it("should be togglable with keyboard", () => {
      cy.get(".todos > *")
        .eq(1)
        .focus()
        .type("{enter}");
      cy.get(".todos .todo")
        .eq(1)
        .should("have.class", "completed");
      cy.get(".todos > *")
        .eq(1)
        .focus()
        .type("{enter}");
      cy.get(".todos .todo")
        .eq(1)
        .should("not.have.class", "completed");
    });
  });

  context("Edit todos", () => {
    beforeEach(() => {
      cy.get(".todo-form input[name=todo-name]")
        .type("Write even more tests{enter}")
        .type("I probably forgot something already...{enter}");
    });

    it("allows user to edit todo", () => {
      cy.get(".todos .todo button[name=edit]")
        .eq(0)
        .click();
      cy.focused().should("have.value", "Write even more tests");
      cy.focused().type(" and make sure that everything works{enter}");
      cy.get(".todos .todo .todo-name")
        .eq(0)
        .should(
          "have.value",
          "Write even more tests and make sure that everything works"
        );

      cy.get(".todos .todo button[name=edit]")
        .eq(1)
        .click();
      cy.focused()
        .type(" (but hopefully not)")
        .blur();
      cy.get(".todos .todo .todo-name")
        .eq(1)
        .should(
          "have.value",
          "I probably forgot something already... (but hopefully not)"
        );
    });

    it("should not change status of a todo", () => {
      cy.get(".todos > *")
        .eq(0)
        .click();
      cy.get(".todos .todo button[name=edit]")
        .eq(0)
        .click();
      cy.focused().type("{enter}");
      cy.get(".todos .todo")
        .eq(0)
        .should("have.class", "completed");

      cy.get(".todos .todo button[name=edit]")
        .eq(0)
        .focus()
        .type("{enter}");
      cy.get(".todos .todo")
        .eq(0)
        .should("have.class", "completed");
    });

    it("should not allow empty todo name", () => {
      cy.get(".todos .todo button[name=edit]")
        .eq(0)
        .click();
      cy.focused()
        .clear()
        .blur();
      cy.get(".todos .todo .todo-name")
        .eq(0)
        .should("have.value", "Write even more tests");
    });

    it("should not allow todo name with only spaces", () => {
      cy.get(".todos .todo button[name=edit]")
        .eq(0)
        .click();
      cy.focused()
        .clear()
        .type("      ")
        .blur();
      cy.get(".todos .todo .todo-name")
        .eq(0)
        .should("have.value", "Write even more tests");
    });
  });
});
