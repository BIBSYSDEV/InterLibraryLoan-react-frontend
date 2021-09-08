import MockAdapter from 'axios-mock-adapter';
import Axios, { AxiosRequestConfig } from 'axios';
import { API_PATHS } from '../utils/constants';
import { MetaData } from '../types/app.types';

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
