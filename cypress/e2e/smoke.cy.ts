import { faker } from "@faker-js/faker";

describe("smoke tests", () => {
  it("should allow you to register and login", () => {
    const loginForm = {
      email: `${faker.internet.userName()}@example.com`,
      password: faker.internet.password(),
    };
    cy.then(() => ({ email: loginForm.email })).as("user");

    cy.visit("/");
    cy.findByRole("link", { name: /sign up/i }).click();

    cy.findByRole("textbox", { name: /email/i }).type(loginForm.email);
    cy.findByLabelText(/password/i).type(loginForm.password);
    cy.findByRole("button", { name: /create account/i }).click();

    cy.findByRole("link", { name: /schedule an apppointment/i }).click();
    cy.findByRole("link", { name: /close/i }).click();
    cy.findByRole("button", { name: /logout/i }).click();
    cy.findByRole("link", { name: /log in/i });
  });

  it("should allow you to make an appointment", () => {
    const testNote = {
      title: faker.lorem.words(1),
      description: faker.lorem.sentences(1),
    };
    cy.login();
    cy.visit("/");

    cy.findByRole("link", { name: /appointments/i }).click();
    cy.findByText("Upcoming appointments");

    cy.findByRole("link", { name: /schedule an appointment/i }).click();
    cy.findByText("Create Appointment");

    cy.get('input[name="title"]').type(testNote.title);
    cy.get('textarea[name="description"]').type(testNote.description);
    cy.findByRole("button", { name: /create/i }).click();

    // cy.findByRole("button", { name: /delete/i }).click();

    // cy.findByText("No notes yet");
  });
});
