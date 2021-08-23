import MockAdapter from 'axios-mock-adapter';
import Axios from 'axios';
import { API_PATHS } from '../utils/constants';

const mockMetadata = {
  title: 'Sample Title',
  creator: 'Per Arne Ytrebjarne',
  standardNumber: '9788276662665',
};

export const interceptRequestsOnMock = () => {
  const mock = new MockAdapter(Axios);

  mock.onGet(new RegExp(`${API_PATHS.metadataPath}.*`)).reply(200, mockMetadata);
  mock.onAny().reply(function (config) {
    throw new Error('Could not find mock for ' + config.url + ', with method: ' + config.method);
  });
};
