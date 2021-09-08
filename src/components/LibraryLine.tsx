import React, { FC, useEffect } from 'react';
import { FormControlLabel, Radio } from '@material-ui/core';
import { getSRU } from '../api/api';
import { Library } from '../types/app.types';

interface LibraryLineProps {
  library: Library;
}

const LibraryLine: FC<LibraryLineProps> = ({ library }) => {
  const errors: any = [];

  useEffect(() => {
    const fetchSRU = async () => {
      try {
        const response = (await getSRU(library.mms_id, library.institution_code, library.library_code)).data;
        console.log(response.libraryCode);
      } catch (error) {
        console.error(error);
        errors.add({ libraryCode: library.library_code });
      }
    };
    library && fetchSRU().then();
  }, [library]);

  return (
    <FormControlLabel
      key={library.library_code}
      disabled={!library.available_for_loan}
      value={library.library_code}
      control={<Radio data-testid={`library-option-${library.library_code}`} required={true} color="primary" />}
      label={`${library.library_name}${!library.available_for_loan ? ' (Closed for inter-library loan)' : ''}`}
    />
  );
};

export default LibraryLine;
