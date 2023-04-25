import { LibraryAccess, MetaData, NCIPResponse, SRUResponse } from '../types/app.types';
import { LIBRARY_CODE_BEV, LIBRARY_CODE_NB_DEP, LIBRARY_CODE_STATPED_OSLO, LIBRARY_CODE_STATPED_TRH } from '../utils/constants';

export const mockRecordIdThatTriggersServerError = '777';

export const mockMMSIdThatTriggersResponseWithNoItems = '92882766626651';
export const mockMMSIdThatTriggersServerError = '9288276662662233';

export const mockLibUserThatTriggersServerError = '487932849';
export const mockLibUserWithoutNCIPAccess = '809348204';
export const mockAlmaLibUser = '64564564';

export const userIdentifierForNCIPServerError = '1234567';
export const mockSRUResponse: SRUResponse = {
  mmsId: '22257098950002203',
  institution: 'NTNU_UB',
  libraryCode: '1150401',
  totalNumberOfItems: 1,
  numberAvailForInterLibraryLoan: 1,
  availableDate: '2021-09-08T00:00Z',
};

export const mockedLibraryAccess: LibraryAccess = {
  isAlmaLibrary: false,
  ncip_server_url: 'ncip_server_url',
};

export const mockedLibraryAccessNoNcip: LibraryAccess = {
  isAlmaLibrary: true,
  ncip_server_url: '',
};

export const mockedLibraryAccessAlmaLibrary: LibraryAccess = {
  isAlmaLibrary: true,
  ncip_server_url: 'ncip_server_url',
};

export const mockSRUResponseWithNoItems: SRUResponse = {
  mmsId: '22257098950002203',
  institution: 'NTNU_UB',
  libraryCode: '1150401',
  totalNumberOfItems: 0,
  numberAvailForInterLibraryLoan: 0,
  availableDate: '2021-09-08T00:00Z',
};

export const mockNCIPResponse: NCIPResponse = {
  message: 'Positive NCIP-response',
};

export const mockMetadata: MetaData = {
  record_id: '85899034',
  display_title: 'This is a sample title',
  creation_year: '1984',
  volume: '234',
  pages: '233424',
  creator: 'Per Bjarne Ytre-Arne, Børre Børresen',
  isbn: '23423432432',
  publication_place: 'Trondheim',
  publisher: 'Sample publisher',
  source: 'BIBSYS_ILS - oria.no',
  libraries: [
    {
      display_name: 'Nationalbiblioteket Depot',
      library_code: LIBRARY_CODE_NB_DEP,
      available_for_loan: true,
      institution_code: 'NB_DEP',
      mms_id: '9288276ff6656',
    },
    {
      display_name: 'NINA Biblioteket',
      library_code: '43424324',
      available_for_loan: false,
      institution_code: 'UIT',
      mms_id: '92882766626654',
    },
    {
      display_name: 'NTNU Universitetsbiblioteket Gunnerusbiblioteket',
      library_code: '6456456',
      available_for_loan: true,
      institution_code: 'UIT',
      mms_id: '92882766626651',
    },
    {
      display_name: 'UiT Norges arktiske universitet Narvikbiblioteket',
      library_code: '12344568',
      available_for_loan: false,
      institution_code: 'UIT',
      mms_id: '92882766626612',
    },
    {
      display_name: 'Universitetsbiblioteket i Bergen Bibliotek for matematisk- naturvitenskapelige fag',
      library_code: '1234569',
      available_for_loan: true,
      institution_code: 'UIB',
      mms_id: '92882766626623',
    },

    {
      display_name: 'Some library that triggers server error',
      library_code: '12345369',
      available_for_loan: true,
      institution_code: 'UIB',
      mms_id: '9288276662662233',
    },
    {
      display_name: 'Nasjonalbiblioteket Pliktavlevering',
      library_code: '0183334',
      available_for_loan: true,
      institution_code: 'UIB',
      mms_id: '92882766626623',
    },
    {
      display_name: 'Detpotbiblioteket Bevaringssamlingen',
      library_code: LIBRARY_CODE_BEV,
      available_for_loan: true,
      institution_code: 'BEV',
      mms_id: '92882766626623',
    },
    {
      display_name: 'Statped',
      library_code: LIBRARY_CODE_STATPED,
      available_for_loan: true,
      institution_code: 'Statped',
      mms_id: '92882766626623',
    },
  ],
};

export const mockMetadataNoInventoryFound: MetaData = {
  record_id: '85899135',
  display_title: 'This is a title that no library has',
  creation_year: '1984',
  volume: '234',
  pages: '233424',
  creator: 'Per Bjarne Ytre-Arne, Børre Børresen',
  isbn: '23423432432',
  publication_place: 'Trondheim',
  publisher: 'Sample publisher',
  source: 'BIBSYS_ILS - oria.no',
  libraries: [],
};
