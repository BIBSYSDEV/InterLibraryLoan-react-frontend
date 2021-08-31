context('start', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('renders', () => {
    cy.get('[data-testid="start"]').contains('Testing 123!');
  });
});
