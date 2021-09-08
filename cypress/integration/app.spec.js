import { mockMetadata, mockRecordIdThatTriggerServerError } from '../../src/api/mock-interceptors';

context('start', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows metadata', () => {
    cy.visit('/?recordid=123');
    cy.get('[data-testid="metaData"]').contains('Creator');
    cy.get('[data-testid="metaData"]').contains(mockMetadata.title);
    cy.get('[data-testid="metaData"]').contains(mockMetadata.year);
    cy.get('[data-testid="metaData"]').contains(mockMetadata.creators[0]);
    cy.get('[data-testid="metaData"]').contains(mockMetadata.publicationPlace);
    cy.get('[data-testid="metaData"]').contains(mockMetadata.isbn);
    cy.get('[data-testid="metaData"]').contains(mockMetadata.source);
    cy.get('[data-testid="alert"]').should('not.exist');
  });

  it('shows errormessage when missing recordid parameter', () => {
    cy.visit('/?vid=NTNU');
    cy.get('[data-testid="alert"]').should('exist').contains('missing');
  });

  it('shows errormessage when metadata-server responds with error', () => {
    cy.visit(`/?recordid=${mockRecordIdThatTriggerServerError}`);
    cy.get('[data-testid="alert"]').should('exist').contains('503');
  });

  it('shows schema', () => {
    cy.visit('/?recordid=123');
    cy.get(`[data-testid="patron-field"]`).type('testuser');
    cy.get(`[data-testid="library-option-${mockMetadata.libraries[0].library_code}"]`).click();
  });
});