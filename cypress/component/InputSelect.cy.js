import SelectInput from "@/components/SelectInput";
import "tailwindcss/tailwind.css";

describe("InputSelect.cy.js", () => {
  it("Render options", () => {
    cy.mount(SelectInput, {
      propsData: {
        value: null,
        options: [
          {
            text: "Test",
            value: 1,
          },
          {
            text: "Hello",
            value: "Hello",
          },
          {
            text: "World",
            value: 2,
          },
        ],
      },
    });
    cy.get("[data-cy=select-label]").click();
    cy.get("[data-cy=select-menu]").should("be.visible");
    cy.get("[data-cy=select-menu] .select-menu-item").first().click();
    cy.get("[data-cy=select-input]").should("have.value", "Test");
  });

  it("Render options with value", () => {
    cy.mount(SelectInput, {
      propsData: {
        value: {
          text: "Test",
          value: 1,
        },
        options: [
          {
            text: "Test",
            value: 1,
          },
          {
            text: "Hello",
            value: "Hello",
          },
          {
            text: "World",
            value: 2,
          },
        ],
      },
    });
    cy.get("[data-cy=select-input]").should("have.value", "Test");
    cy.get("[data-cy=select-label]").click();
    cy.get("[data-cy=select-menu]").should("be.visible");
    cy.get("[data-cy=select-menu] .select-menu-item").last().click();
    cy.get("[data-cy=select-input]").should("have.value", "World");
  });
});
