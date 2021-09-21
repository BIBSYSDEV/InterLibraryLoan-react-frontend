import MockAdapter from 'axios-mock-adapter';
import Axios, { AxiosRequestConfig } from 'axios';
import { API_PATHS } from '../utils/constants';
import { SearchParameters } from '../types/app.types';
import {
  mockedLibraryAccess,
  mockedLibraryAccessNoNcip,
  mockLibUserThatTriggersServerError,
  mockLibUserWithoutNCIPAccess,
  mockMetadata,
  mockMMSIdThatTriggersResponseWithNoItems,
  mockMMSIdThatTriggersServerError,
  mockNCIPResponse,
  mockRecordIdThatTriggersServerError,
  mockSRUResponse,
  mockSRUResponseWithNoItems,
  userIdentifierForNCIPServerError,
} from './mockdata';

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
    //console.log('MOCKED API-CALL: ', config, statusCode, mockedResult);
    console.log('MOCKED API-CALL: ', config.url);
    return [statusCode, mockedResult];
  };

  const mock = new MockAdapter(Axios);

  // METADATA
  mockGetDelayedAndLogged(
    `${API_PATHS.metadata}\\?${SearchParameters.documentId}=${mockRecordIdThatTriggersServerError}`,
    500,
    null
  );
  mockGetDelayedAndLogged(`${API_PATHS.metadata}.*`, 200, mockMetadata);

  // LIBCHECK
  mockGetDelayedAndLogged(
    `${API_PATHS.libcheck}\\?${SearchParameters.libuser}=${mockLibUserWithoutNCIPAccess}`,
    200,
    mockedLibraryAccessNoNcip,
    0
  );
  mockGetDelayedAndLogged(
    `${API_PATHS.libcheck}\\?${SearchParameters.libuser}=${mockLibUserThatTriggersServerError}`,
    500,
    null
  );
  mockGetDelayedAndLogged(`${API_PATHS.libcheck}\\?${SearchParameters.libuser}.*`, 200, mockedLibraryAccess, 0);

  // SRU
  mockGetDelayedAndLogged(
    `${API_PATHS.sru}\\?${SearchParameters.mms_id}=${mockMMSIdThatTriggersResponseWithNoItems}`,
    200,
    mockSRUResponseWithNoItems
  );
  mockGetDelayedAndLogged(
    `${API_PATHS.sru}\\?${SearchParameters.mms_id}=${mockMMSIdThatTriggersServerError}`,
    500,
    null
  );
  mockGetDelayedAndLogged(`${API_PATHS.sru}.*`, 200, mockSRUResponse);

  // NCIP
  mock
    .onPost(`${API_PATHS.ncip}`, {
      asymmetricMatch: (actual: any) => userIdentifierForNCIPServerError === actual['userIdentifierValue'],
    })
    .reply(503, null);

  mock.onPost(`${API_PATHS.ncip}`).reply(201, mockNCIPResponse);

  // ALL OTHER
  mock.onAny().reply(function (config) {
    throw new Error('Could not find mock for ' + config.url + ', with method: ' + config.method);
  });
};
