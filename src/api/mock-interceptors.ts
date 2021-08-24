import MockAdapter from 'axios-mock-adapter';
import Axios, { AxiosRequestConfig } from 'axios';
import { API_PATHS } from '../utils/constants';

export const mockMetadata = {
  title: 'Sample Title',
  creator: 'Per Arne Ytrebjarne',
  standardNumber: '9788276662665',
  year: '1974',
  publicationPlace: 'Trondheim',
  source: 'BIBSYS_ILS - oria.no',
};

export const mockRecordIdThatTriggerServerError = '777';

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

  mockGetDelayedAndLogged(`${API_PATHS.metadataPath}\\?recordid=${mockRecordIdThatTriggerServerError}`, 503, null);
  mockGetDelayedAndLogged(`${API_PATHS.metadataPath}.*`, 200, mockMetadata);

  mock.onAny().reply(function (config) {
    throw new Error('Could not find mock for ' + config.url + ', with method: ' + config.method);
  });
};
