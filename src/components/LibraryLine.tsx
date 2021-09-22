import React, { FC, useEffect, useState } from 'react';
import { CircularProgress, FormControlLabel, Radio, Typography } from '@material-ui/core';
import { getSRU } from '../api/api';
import { Library } from '../types/app.types';
import styled from 'styled-components';
import { Colors } from '../themes/mainTheme';
import { LIBRARY_CODES_ALWAYS_ACCESSIBLE_FOR_LOAN } from '../utils/constants';

const StyledErrorMessage = styled(Typography)`
  margin-left: 0.3rem;
`;

const StyledHoldingsInfo = styled(Typography)`
  margin-left: 0.3rem;
  font-weight: 600;
`;

interface LibraryLineProps {
  library: Library;
}

export const TEXT = {
  CLOSED: 'Closed for interlibrary loan',
  NO_ITEM_INFO: 'No holding information. Contact the library',
  OF: 'of',
  AVAILABLE: 'available',
  FETCH_SRU_ERROR: 'Could not fetch holdings information',
};

const LibraryLine: FC<LibraryLineProps> = ({ library }) => {
  const [isLoadingSRU, setIsLoadingSRU] = useState(false);
  const [fetchSRUError, setFetchSRUError] = useState<Error>();
  const [isDisabled, setIsDisabled] = useState(true);
  const [totalNumberOfItems, setTotalNumberOfItems] = useState(0);
  const [numberAvailForInterLibraryLoan, setNumberAvailForInterLibraryLoan] = useState(0);

  useEffect(() => {
    const fetchSRU = async () => {
      try {
        setFetchSRUError(undefined);
        setIsLoadingSRU(true);
        const response = (await getSRU(library.mms_id, library.institution_code, library.library_code)).data;
        setNumberAvailForInterLibraryLoan(response.numberAvailForInterLibraryLoan);
        setTotalNumberOfItems(response.totalNumberOfItems);
      } catch (error) {
        error instanceof Error && setFetchSRUError(error);
      } finally {
        setIsLoadingSRU(false);
      }
    };
    library && library.available_for_loan && library.mms_id && fetchSRU().then();
  }, [library]);

  useEffect(() => {
    setIsDisabled(
      !library.available_for_loan ||
        isLoadingSRU ||
        !!fetchSRUError ||
        (numberAvailForInterLibraryLoan === 0 &&
          !LIBRARY_CODES_ALWAYS_ACCESSIBLE_FOR_LOAN.includes(library.library_code)) ||
        (totalNumberOfItems === 0 && LIBRARY_CODES_ALWAYS_ACCESSIBLE_FOR_LOAN.includes(library.library_code))
    );
  }, [library, fetchSRUError, isLoadingSRU, numberAvailForInterLibraryLoan, totalNumberOfItems]);

  return (
    <FormControlLabel
      disabled={isDisabled}
      value={library.library_code}
      control={
        isLoadingSRU ? (
          <Radio icon={isLoadingSRU && <CircularProgress size="1.5rem" />} />
        ) : (
          <Radio data-testid={`library-option-${library.library_code}`} required={true} color="primary" />
        )
      }
      label={
        <div data-testid={`library-label-${library.library_code}`}>
          <Typography
            display="inline"
            style={isDisabled ? { color: Colors.DisabledText } : { color: Colors.PrimaryText }}>
            {library.display_name}
          </Typography>
          {fetchSRUError ? (
            <StyledErrorMessage display="inline">({TEXT.FETCH_SRU_ERROR})</StyledErrorMessage>
          ) : !library.available_for_loan ? (
            <StyledErrorMessage display="inline">({TEXT.CLOSED})</StyledErrorMessage>
          ) : (
            !isLoadingSRU &&
            (totalNumberOfItems === 0 && numberAvailForInterLibraryLoan === 0 ? (
              <StyledErrorMessage display="inline">({TEXT.NO_ITEM_INFO})</StyledErrorMessage>
            ) : totalNumberOfItems > 0 &&
              numberAvailForInterLibraryLoan === 0 &&
              !LIBRARY_CODES_ALWAYS_ACCESSIBLE_FOR_LOAN.includes(library.library_code) ? (
              <StyledErrorMessage display="inline">
                (0 {TEXT.OF} {totalNumberOfItems} {TEXT.AVAILABLE})
              </StyledErrorMessage>
            ) : (
              <StyledHoldingsInfo display="inline">
                ({numberAvailForInterLibraryLoan} {TEXT.OF} {totalNumberOfItems} {TEXT.AVAILABLE})
              </StyledHoldingsInfo>
            ))
          )}
        </div>
      }
    />
  );
};

export default LibraryLine;
