import Axios, { AxiosResponse } from 'axios';
import { setAxiosDefaults } from '../utils/axios-config';
import { API_PATHS } from '../utils/constants';
import { LibraryAccess, MetaData, NCIPRequest, NCIPResponse, QueryParameters, SRUResponse } from '../types/app.types';

setAxiosDefaults();

export const getMetadata = (recordId: string): Promise<AxiosResponse<MetaData>> => {
  return Axios({
    url: encodeURI(`${API_PATHS.metadata}?${QueryParameters.documentId}=${recordId}`),
    method: 'GET',
  });
};

export const getLibraryAccess = (libuser: string): Promise<AxiosResponse<LibraryAccess>> => {
  return Axios({
    url: encodeURI(`${API_PATHS.libcheck}?${QueryParameters.libuser}=${libuser}`),
    method: 'GET',
  });
};

export const postNCIPRequest = (request: NCIPRequest): Promise<AxiosResponse<NCIPResponse>> => {
  return Axios({
    url: encodeURI(`${API_PATHS.ncip}`),
    method: 'POST',
    data: request,
  });
};

export const getSRU = (
  mmsId: string,
  institution: string,
  libraryCode: string
): Promise<AxiosResponse<SRUResponse>> => {
  return Axios({
    url: encodeURI(
      `${API_PATHS.sru}?${QueryParameters.mms_id}=${mmsId}&${QueryParameters.institution}=${institution}&${QueryParameters.libraryCode}=${libraryCode}&recordSchema=isohold`
    ),
    method: 'GET',
  });
};
