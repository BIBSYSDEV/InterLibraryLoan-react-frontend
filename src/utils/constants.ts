export const USE_MOCK_DATA = process.env.REACT_APP_USE_MOCK === 'true';
export const API_URL = process.env.REACT_APP_API_URL;

export const API_PATHS = {
  metadata: '/interLibraryLoanMetadata',
  alma: '/alma',
};

const LIBRARY_CODE_NB_DEP = '0183300';
export const LIBRARY_CODES_ALWAYS_ACCESSIBLE_FOR_LOAN = [LIBRARY_CODE_NB_DEP];
