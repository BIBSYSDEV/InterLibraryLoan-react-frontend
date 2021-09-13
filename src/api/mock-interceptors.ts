import MockAdapter from 'axios-mock-adapter';
import Axios, { AxiosRequestConfig } from 'axios';
import { API_PATHS } from '../utils/constants';
import { LibraryAccess, MetaData, SRUResponse } from '../types/app.types';

export const mockSRUResponse: SRUResponse = {
  mmsId: '22257098950002203',
  institution: 'NTNU_UB',
  libraryCode: '1150401',
  totalNumberOfItems: 1,
  numberAvailForInterLibraryLoan: 1,
  availableDate: '2021-09-08T00:00Z',
};

export const mockedLibraryAccess: LibraryAccess = {
  isAlmaLibrary: true,
  isNCIPLibrary: true,
};

export const mockedLibraryAccessNoNcip: LibraryAccess = {
  isAlmaLibrary: true,
  isNCIPLibrary: false,
};

export const mockSRUResponseWithNoItems: SRUResponse = {
  mmsId: '22257098950002203',
  institution: 'NTNU_UB',
  libraryCode: '1150401',
  totalNumberOfItems: 0,
  numberAvailForInterLibraryLoan: 0,
  availableDate: '2021-09-08T00:00Z',
};

export const mockMetadata: MetaData = {
  title: 'Sample Title',
  creators: ['Per Bjarne Ytre-Arne', 'Børre Børresen'],
  year: '1974',
  isbn: '23423432432',
  publicationPlace: 'Trondheim',
  source: 'BIBSYS_ILS - oria.no',
  libraries: [
    {
      library_name: 'Nationalbiblioteket Depot',
      library_code: '0183300',
      available_for_loan: true,
      institution_code: 'NB_DEP',
      mms_id: '9288276ff6656',
    },
    {
      library_name: 'NINA Biblioteket',
      library_code: '43424324',
      available_for_loan: false,
      institution_code: 'UIT',
      mms_id: '92882766626654',
    },
    {
      library_name: 'NTNU Universitetsbiblioteket Gunnerusbiblioteket',
      library_code: '6456456',
      available_for_loan: true,
      institution_code: 'UIT',
      mms_id: '92882766626651',
    },
    {
      library_name: 'UiT Norges arktiske universitet Narvikbiblioteket',
      library_code: '12344568',
      available_for_loan: false,
      institution_code: 'UIT',
      mms_id: '92882766626612',
    },
    {
      library_name: 'Universitetsbiblioteket i Bergen Bibliotek for matematisk- naturvitenskapelige fag',
      library_code: '1234569',
      available_for_loan: true,
      institution_code: 'UIB',
      mms_id: '92882766626623',
    },
    {
      library_name: 'Some library that triggers server error',
      library_code: '12345369',
      available_for_loan: true,
      institution_code: 'UIB',
      mms_id: '9288276662662233',
    },
  ],
};

export const mockRecordIdThatTriggersServerError = '777';

export const mockMMSIdThatTriggersResponseWithNoItems = '92882766626651';
export const mockMMSIdThatTriggersServerError = '9288276662662233';

export const mockLibUserThatTriggersServerError = '487932849';
export const mockLibUserWithoutNCIPAccess = '809348204';

export const interceptRequestsOnMock = () => {
  const mockGetDelayedAndLogged = (pathPattern: string, statusCode: number, mockedResponse: any, delay = 0) => {
    mock.onGet(new RegExp(pathPattern)).reply((config) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(loggedReply(config, statusCode, mockedResponse));
        }, delay);
      });
    });
  };

  const loggedReply = (config: AxiosRequestConfig, statusCode: number, mockedResult: unknown) => {
    /* eslint-disable no-console */
    console.log('MOCKED API-CALL: ', config.url);
    //console.log('MOCKED API-CALL: ', config, statusCode, mockedResult);
    return [statusCode, mockedResult];
  };

  const mock = new MockAdapter(Axios);

  // METADATA
  mockGetDelayedAndLogged(`${API_PATHS.metadata}\\?recordid=${mockRecordIdThatTriggersServerError}`, 500, null);

  mockGetDelayedAndLogged(`${API_PATHS.metadata}.*`, 200, mockMetadata);

  // LIBCHECK
  mockGetDelayedAndLogged(
    `${API_PATHS.libcheck}\\?libuser=${mockLibUserWithoutNCIPAccess}`,
    200,
    mockedLibraryAccessNoNcip,
    0
  );
  mockGetDelayedAndLogged(`${API_PATHS.libcheck}\\?libuser=${mockLibUserThatTriggersServerError}`, 500, null);
  mockGetDelayedAndLogged(`${API_PATHS.libcheck}\\?libuser.*`, 200, mockedLibraryAccess, 0);

  // SRU
  mockGetDelayedAndLogged(
    `${API_PATHS.sru}\\?mms_id=${mockMMSIdThatTriggersResponseWithNoItems}`,
    200,
    mockSRUResponseWithNoItems
  );
  mockGetDelayedAndLogged(`${API_PATHS.sru}\\?mms_id=${mockMMSIdThatTriggersServerError}`, 500, null);
  mockGetDelayedAndLogged(`${API_PATHS.sru}.*`, 200, mockSRUResponse);

  // ALL OTHER
  mock.onAny().reply(function (config) {
    throw new Error('Could not find mock for ' + config.url + ', with method: ' + config.method);
  });
};
