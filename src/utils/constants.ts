export const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK === 'true';
export const API_URL = process.env.REACT_APP_API_URL;

export const API_PATHS = {
  libcheck: '/ill/libcheck',
  metadata: '/ill/metadata',
  ncip: '/ill/ncip',
  sru: '/alma',
};

export const LIBRARY_CODE_NB_DEP = '0183300';

//Bev = Bevaringssamling at NB. It is possible to order even when they don't have the book available.
export const LIBRARY_CODE_BEV = '0183334';
export const LIBRARY_CODE_STATPED_OSLO = '1032003';
export const LIBRARY_CODE_STATPED_TRH = '1160130'
export const LIBRARY_CODES_ALWAYS_ACCESSIBLE_FOR_LOAN = [LIBRARY_CODE_NB_DEP];
