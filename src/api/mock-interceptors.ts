import MockAdapter from 'axios-mock-adapter';
import Axios, { AxiosRequestConfig } from 'axios';
import { API_PATHS } from '../utils/constants';
import { MetaData, SRUResponse } from '../types/app.types';

export const mockSRUResponse: SRUResponse = {
  mmsId: '22257098950002203',
  institution: 'NTNU_UB',
  libraryCode: '1150401',
  totalNumberOfItems: 3,
  numberAvailForInterLibraryLoan: 2,
  availableDate: '2021-09-08T00:00Z',
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
      library_name: 'UiT Norges arktiske universitet Altabiblioteket ',
      library_code: '1234567',
      available_for_loan: true,
      institution_code: 'UIT',
      mms_id: '9288276662665',
    },
    {
      library_name: 'UiT Norges arktiske universitet Narvikbiblioteket',
      library_code: '1234568',
      available_for_loan: false,
      institution_code: 'UIT',
      mms_id: '9288276662661',
    },
    {
      library_name: 'Universitetsbiblioteket i Bergen Bibliotek for matematisk- naturvitenskapelige fag',
      library_code: '1234569',
      available_for_loan: true,
      institution_code: 'UIB',
      mms_id: '9288276662662',
    },
  ],
};

export const mockRecordIdThatTriggersServerError = '777';
export const mockMMSIdThatTriggersResponseWithNoItems = '123';
export const mockMMSIdThatTriggersServerError = '234';

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

  mockGetDelayedAndLogged(`${API_PATHS.metadata}\\?recordid=${mockRecordIdThatTriggersServerError}`, 503, null);
  mockGetDelayedAndLogged(`${API_PATHS.metadata}.*`, 200, mockMetadata);

  mockGetDelayedAndLogged(
    `${API_PATHS.alma}\\?mms_id=${mockMMSIdThatTriggersResponseWithNoItems}`,
    200,
    mockSRUResponseWithNoItems
  );
  mockGetDelayedAndLogged(`${API_PATHS.alma}\\?mms_id=${mockMMSIdThatTriggersServerError}`, 503, null);
  mockGetDelayedAndLogged(`${API_PATHS.alma}.*`, 200, mockSRUResponse, 2000);

  mock.onAny().reply(function (config) {
    throw new Error('Could not find mock for ' + config.url + ', with method: ' + config.method);
  });
};
