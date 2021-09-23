export interface MetaData {
  creation_year: string;
  creator: string;
  display_title: string;
  isbn: string;
  libraries: Library[];
  pages: string;
  publication_place: string;
  publisher: string;
  record_id: string;
  source: string;
  volume: string;
}

export interface Library {
  available_for_loan: boolean;
  display_name: string;
  institution_code: string;
  library_code: string;
  mms_id: string;
  ncip_server_url: string;
}

export interface SRUResponse {
  mmsId: string;
  institution: string;
  libraryCode: string;
  totalNumberOfItems: number;
  numberAvailForInterLibraryLoan: number;
  availableDate: string;
}

export interface LibraryAccess {
  isNcipLibrary: boolean;
  isAlmaLibrary: boolean;
}

export enum MediaTypes {
  Book = 'book',
}

export enum RequestTypes {
  Physical = 'Physical',
}

export enum BibliographicRecordIdentifierCodes {
  OwnerLocalRecordID = 'OwnerLocalRecordID',
}

export enum QueryParameters {
  libuser = 'libuser',
  mms_id = 'mms_id',
  institution = 'institution',
  libraryCode = 'libraryCode',
  recordid = 'recordid',
  documentId = 'document_id',
  patronid = 'patronid',
  vid = 'vid',
  message = 'message',
}

export interface NCIPRequest {
  toAgencyId: string;
  fromAgencyId: string;
  isbnValue: string;
  userIdentifierValue: string;
  author: string;
  title: string;
  publisher: string;
  publicationDate: string;
  placeOfPublication: string;
  bibliographicRecordIdentifier: string;
  bibliographicRecordIdentifierCode: string;
  type: string;
  requestType: string;
  comment: string;
  ncipServerUrl: string;
}

export interface NCIPResponse {
  message: string;
}
