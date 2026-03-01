describe('Tests for the Tech-Administration Page', () => {
  it('Load Tech-Administration', function() {
    cy.visit('http://localhost:4200/administration')

  });

  it('Create Technology', function() {
    cy.visit('http://localhost:4200/administration')

    cy.get('tech-form-component mat-form-field').contains('Name').click();
    cy.get('tech-form-component input[formcontrolname="nameFormControl"], tech-form-component input[type="text"]').first().type('Test');
    cy.get('tech-form-component mat-select').first().click();
    cy.get('mat-option').first().click();
    cy.get('tech-form-component textarea').first().type('Test');
    cy.get('tech-form-component button[type="submit"]').contains('Technologie erfassen').click();

  });

  it('Publish Technology', function() {
    cy.visit('http://localhost:4200/administration')

    cy.get('mat-card').last().find('button').contains('Publizieren').click();
    cy.get('#techDialog mat-select').click();
    cy.get('mat-option').first().click();
    cy.get('#techDialog textarea').click({force: true});
    cy.get('#techDialog textarea').type('Test');
    cy.get('mat-dialog-actions button').contains('Technologie publizieren').click();
    cy.get('mat-dialog-actions button').contains('Schliessen').click();

  });

  it('Delete Technology', function() {
    cy.visit('http://localhost:4200/administration')

    cy.get('mat-card').last().find('button').contains('Löschen').click();

  });
});
