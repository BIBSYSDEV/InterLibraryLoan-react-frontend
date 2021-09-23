import {
  mockAlmaLibUser,
  mockLibUserThatTriggersServerError,
  mockLibUserWithoutNCIPAccess,
  mockMetadata,
  mockRecordIdThatTriggersServerError,
  userIdentifierForNCIPServerError,
} from '../../src/api/mockdata';
import { TEXT } from '../../src/components/LibraryLine';
import { LIBRARY_CODE_NB_DEP } from '../../src/utils/constants';

context('start', () => {
  beforeEach(() => {
    cy.visit('?recordid=123&patronid=123');
  });

  it('shows metadata', () => {
    cy.get('[data-testid="metaData"]').contains('Creator');
    cy.get('[data-testid="metaData"]').contains(mockMetadata.display_title);
    cy.get('[data-testid="metaData"]').contains(mockMetadata.creation_year);
    cy.get('[data-testid="metaData"]').contains(mockMetadata.creator);
    cy.get('[data-testid="metaData"]').contains(mockMetadata.publication_place);
    cy.get('[data-testid="metaData"]').contains(mockMetadata.isbn);
    cy.get('[data-testid="metaData"]').contains(mockMetadata.source);
    cy.get('[data-testid="metaData"]').contains(mockMetadata.volume);
    cy.get('[data-testid="metaData"]').contains(mockMetadata.publisher);
    cy.get('[data-testid="alert"]').should('not.exist');
  });

  it('shows errormessage when metadata-server responds with error', () => {
    cy.visit(`?recordid=${mockRecordIdThatTriggersServerError}&patronid=123`);
    cy.get('[data-testid="alert"]').should('exist').contains('500');
  });

  it('shows schema', () => {
    cy.get(`[data-testid="patron-field"]`).type('testuser');
    cy.get(`[data-testid="library-option-${mockMetadata.libraries[0].library_code}"]`).click();
  });

  it('library show holdings', () => {
    cy.get(`[data-testid="library-label-${mockMetadata.libraries[0].library_code}"]`).contains('1 of 1 available');
  });

  it('library show server error', () => {
    cy.get(`[data-testid="library-label-${mockMetadata.libraries[5].library_code}"]`).contains('500');
  });

  it('library show server error', () => {
    cy.get(`[data-testid="library-label-${mockMetadata.libraries[2].library_code}"]`).contains(TEXT.NO_ITEM_INFO);
  });

  it('library show closed', () => {
    cy.get(`[data-testid="library-label-${mockMetadata.libraries[1].library_code}"]`).contains(TEXT.CLOSED);
  });

  it('lib_user-access-api shows servererror', () => {
    cy.visit(`?recordid=123&patronid=${mockLibUserThatTriggersServerError}`);
    cy.get('[data-testid="alert"]').should('exist').contains('500');
  });

  it('lib_user does not have access to ill', () => {
    cy.visit(`?recordid=123&patronid=${mockLibUserWithoutNCIPAccess}`);
    cy.get('[data-testid="warning"]').should('exist').contains('not available');
  });

  it('lib_user is alma-library and should get a read-only schema', () => {
    cy.visit(`/?recordid=123&patronid=${mockAlmaLibUser}&vid=123`);
    cy.get('[data-testid="warning"]').should('exist').contains('Alma libraries');
  });

  it('user needs to fill out form before pressing request-button', () => {
    cy.get(`[data-testid="library-option-${LIBRARY_CODE_NB_DEP}"]`).click();
    cy.get(`[data-testid="ncip-request-button"]`).click();
    cy.get('input:invalid').should('have.length', 1);
    cy.get(`[data-testid="patron-field"]`).type('someText');
    cy.get('input:invalid').should('have.length', 0);
    cy.get(`[data-testid="ncip-request-button"]`).click();
  });

  it('user sends a unsuccessful NCIP-request', () => {
    cy.get(`[data-testid="patron-field"]`).type(userIdentifierForNCIPServerError);
    cy.get(`[data-testid="library-option-${LIBRARY_CODE_NB_DEP}"]`).click();
    cy.get(`[data-testid="ncip-request-button"]`).click();
    cy.get('[data-testid="ncip-error-alert"]').should('exist');
  });

  it('user sends a successful NCIP-request', () => {
    cy.get(`[data-testid="patron-field"]`).type('547839');
    cy.get(`[data-testid="library-option-${LIBRARY_CODE_NB_DEP}"]`).click();
    cy.get(`[data-testid="ncip-request-button"]`).click();
    cy.get('[data-testid="ncip-success-alert"]').should('exist');
  });
});
