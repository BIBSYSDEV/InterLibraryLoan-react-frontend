context('start', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders', () => {
    cy.get('[data-testid="start"]').contains('Velkommen!');
  });
});
