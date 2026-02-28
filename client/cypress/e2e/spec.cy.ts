describe('template spec', () => {
  it('Load Cypress Viewer', () => {
    cy.visit('/viewer')
  });

  it('Load Tech-Viewer', function() {
    cy.visit('http://localhost:4200/viewer')

  });
  it('Load Tech-Administration', function() {
    cy.visit('http://localhost:4200/administration')

  });
});
