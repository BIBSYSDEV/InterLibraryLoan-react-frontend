export interface MetaData {
  title: string;
  creators: string[];
  isbn?: string;
  publicationPlace: string;
  year?: string;
  volume?: string;
  source?: string;
  record_id?: string;
  creation_year?: string;
  creator?: string[];
  display_title?: string;
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
  isNCIPLibrary: boolean;
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
