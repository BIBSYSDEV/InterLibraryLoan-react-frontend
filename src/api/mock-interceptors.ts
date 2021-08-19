import MockAdapter from 'axios-mock-adapter';
import Axios, { AxiosRequestConfig } from 'axios';

export const intercetRequestOnMock = () => {
  const mock = new MockAdapter(Axios);

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

  /*
  Sample mock:
   mock.onGet(new RegExp('textfilepath')).reply(200, mockText);
   */
};
