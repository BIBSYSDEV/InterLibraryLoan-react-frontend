import { mockMetadata, mockRecordIdThatTriggersServerError } from '../../src/api/mock-interceptors';
import { TEXT } from '../../src/components/LibraryLine';

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
    cy.visit(`/?recordid=${mockRecordIdThatTriggersServerError}`);
    cy.get('[data-testid="alert"]').should('exist').contains('503');
  });

  it('shows schema', () => {
    cy.visit('/?recordid=123');
    cy.get(`[data-testid="patron-field"]`).type('testuser');
    cy.get(`[data-testid="library-option-${mockMetadata.libraries[0].library_code}"]`).click();
  });

  it('library show holdings', () => {
    cy.visit('/?recordid=123');
    cy.get(`[data-testid="library-label-${mockMetadata.libraries[0].library_code}"]`).contains('1 of 1 available');
  });

  it('library show server error', () => {
    cy.visit('/?recordid=123');
    cy.get(`[data-testid="library-label-${mockMetadata.libraries[5].library_code}"]`).contains('503');
  });

  it('library show server error', () => {
    cy.visit('/?recordid=123');
    cy.get(`[data-testid="library-label-${mockMetadata.libraries[2].library_code}"]`).contains(TEXT.NO_ITEM_INFO);
  });

  it('library show closed', () => {
    cy.visit('/?recordid=123');
    cy.get(`[data-testid="library-label-${mockMetadata.libraries[1].library_code}"]`).contains(TEXT.CLOSED);
  });
});
