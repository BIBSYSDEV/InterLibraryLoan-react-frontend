import Axios, { AxiosResponse } from 'axios';
import { setAxiosDefaults } from '../utils/axios-config';
import { API_PATHS } from '../utils/constants';
import { LibraryAccess, MetaData, SRUResponse } from '../types/app.types';

setAxiosDefaults();

export const getMetadata = (recordId: string): Promise<AxiosResponse<MetaData>> => {
  return Axios({
    url: encodeURI(`${API_PATHS.metadata}?recordid=${recordId}`),
    method: 'GET',
  });
};

export const getLibraryAccess = (patronid: string): Promise<AxiosResponse<LibraryAccess>> => {
  return Axios({
    url: encodeURI(`${API_PATHS.metadata}?patronid=${patronid}`),
    method: 'GET',
  });
};

export const getSRU = (
  mmsId: string,
  institution: string,
  libraryCode: string
): Promise<AxiosResponse<SRUResponse>> => {
  return Axios({
    url: encodeURI(`${API_PATHS.alma}?mms_id=${mmsId}&institution=${institution}&libraryCode=${libraryCode}`),
    method: 'GET',
  });
};
