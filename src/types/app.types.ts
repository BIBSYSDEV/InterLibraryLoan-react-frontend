export interface MetaData {
  title: string;
  creators: string;
  isbn: string;
  publicationPlace: string;
  creation_year: string;
  volume: string;
  source: string;
  record_id: string;
  display_title: string;
  libraries: Library[];
}

export interface Library {
  institution_code: string;
  library_name: string;
  mms_id: string;
  library_code: string;
  available_for_loan: boolean;
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
