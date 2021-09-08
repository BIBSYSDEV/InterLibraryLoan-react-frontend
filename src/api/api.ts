import Axios, { AxiosResponse } from 'axios';
import { setAxiosDefaults } from '../utils/axios-config';
import { API_PATHS } from '../utils/constants';
import { MetaData } from '../types/app.types';

setAxiosDefaults();

export const getMetadata = (recordId: string): Promise<AxiosResponse<MetaData>> => {
  return Axios({
    url: encodeURI(`${API_PATHS.metadata}?recordid=${recordId}`),
    method: 'GET',
  });
};