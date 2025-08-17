// Test Case 18: View Category Products

describe("UI Platform - TC18: View Category Products", () => {
  it("follows categories from Women->Tops and Men->Tshirts (step-by-step)", () => {
    // 1) Launch browser
    cy.visit("/");

    // 2) Navigate to url (baseUrl already used)
    // 3) Verify that categories are visible on left side bar
    cy.get(".left-sidebar")
      .should("be.visible")
      .and("contain.text", "Category");
    cy.get("#accordian").scrollIntoView();

    // 4) Click on 'Women' category
    cy.get('#accordian a[href="#Women"]').click({ force: true });

    // 5) Click on a subcategory under 'Women' (use Tops to match step 6)
    cy.get("#Women").should("be.visible");
    cy.get("#Women").contains(/Tops/i).click({ force: true });

    // 6) Verify page shows 'WOMEN - TOPS PRODUCTS'
    cy.location("pathname").should("include", "/category_products");
    cy.contains(/WOMEN\s*-\s*TOPS\s*PRODUCTS/i).should("be.visible");

    // 7) On left side bar, click a sub-category under 'Men' (e.g., Tshirts)
    cy.get('#accordian a[href="#Men"]').click({ force: true });
    cy.get("#Men").should("be.visible");
    cy.get("#Men")
      .contains(/Tshirts/i)
      .click({ force: true });

    // 8) Verify user is navigated to that Men category page
    cy.location("pathname").should("include", "/category_products");
    cy.contains(/MEN\s*-\s*TSHIRTS\s*PRODUCTS/i).should("be.visible");
  });
});
