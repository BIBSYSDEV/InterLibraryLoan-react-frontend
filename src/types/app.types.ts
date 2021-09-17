export interface MetaData {
  creators: string;
  isbn: string;
  publication_place: string;
  creation_year: string;
  volume: string;
  source: string;
  record_id: string;
  display_title: string;
  publisher: string;
  pages: string;
  libraries: Library[];
}

export interface Library {
  institution_code: string;
  display_name: string;
  mms_id: string;
  library_code: string;
  available_for_loan: boolean;
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

export enum SearchParameters {
  libuser = 'libuser',
  mms_id = 'mms_id',
  institution = 'institution',
  libraryCode = 'librarycode',
  recordid = 'recordid',
  patronid = 'patronid',
  vid = 'vid',
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
