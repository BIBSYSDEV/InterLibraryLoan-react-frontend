import React, { FC, useEffect, useState } from 'react';
import { CircularProgress, FormControlLabel, Radio, Typography } from '@material-ui/core';
import { getSRU } from '../api/api';
import { Library } from '../types/app.types';
import styled from 'styled-components';
import { Colors } from '../themes/mainTheme';

const StyledErrorMessage = styled(Typography)`
  margin-left: 0.3rem;
  color: ${Colors.Warning};
  font-weight: 600;
`;

interface LibraryLineProps {
  library: Library;
}

const LibraryLine: FC<LibraryLineProps> = ({ library }) => {
  const [isLoadingSRU, setIsLoadingSRU] = useState(false);
  const [fetchSRUError, setFetchSRUError] = useState<Error>();

  useEffect(() => {
    const fetchSRU = async () => {
      try {
        setFetchSRUError(undefined);
        setIsLoadingSRU(true);
        const response = (await getSRU(library.mms_id, library.institution_code, library.library_code)).data;
        console.log(response.libraryCode);
      } catch (error) {
        error instanceof Error && setFetchSRUError(error);
      } finally {
        setIsLoadingSRU(false);
      }
    };
    library && library.available_for_loan && fetchSRU().then();
  }, [library]);

  return (
    <FormControlLabel
      disabled={!library.available_for_loan || isLoadingSRU || !!fetchSRUError}
      value={library.library_code}
      control={
        isLoadingSRU ? (
          <Radio icon={isLoadingSRU && <CircularProgress size="1.5rem" />} />
        ) : (
          <Radio data-testid={`library-option-${library.library_code}`} required={true} color="primary" />
        )
      }
      label={
        <>
          <Typography display="inline">{library.library_name}</Typography>
          {!library.available_for_loan && (
            <StyledErrorMessage display="inline">(Closed for inter-library loan)</StyledErrorMessage>
          )}
          {fetchSRUError && <StyledErrorMessage display="inline">({fetchSRUError.message})</StyledErrorMessage>}
        </>
      }
    />
  );
};

export default LibraryLine;
