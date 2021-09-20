import Axios, { AxiosResponse } from 'axios';
import { setAxiosDefaults } from '../utils/axios-config';
import { API_PATHS } from '../utils/constants';
import { LibraryAccess, MetaData, NCIPRequest, NCIPResponse, SearchParameters, SRUResponse } from '../types/app.types';

setAxiosDefaults();

export const getMetadata = (recordId: string): Promise<AxiosResponse<MetaData>> => {
  return Axios({
    url: encodeURI(`${API_PATHS.metadata}?${SearchParameters.documentId}=${recordId}`),
    method: 'GET',
  });
};

export const getLibraryAccess = (libuser: string): Promise<AxiosResponse<LibraryAccess>> => {
  return Axios({
    url: encodeURI(`${API_PATHS.libcheck}?${SearchParameters.libuser}=${libuser}`),
    method: 'GET',
  });
};

export const postNCIPRequest = (request: NCIPRequest): Promise<AxiosResponse<NCIPResponse>> => {
  //const url = getAsUriParameters(request);

  return Axios({
    url: encodeURI(`${API_PATHS.ncip}`),
    method: 'POST',
    data: { transferMessage: request },
  });
};

export const getSRU = (
  mmsId: string,
  institution: string,
  libraryCode: string
): Promise<AxiosResponse<SRUResponse>> => {
  return Axios({
    url: encodeURI(
      `${API_PATHS.sru}?${SearchParameters.mms_id}=${mmsId}&${SearchParameters.institution}=${institution}&${SearchParameters.libraryCode}=${libraryCode}&recordSchema=isohold`
    ),
    method: 'GET',
  });
};
