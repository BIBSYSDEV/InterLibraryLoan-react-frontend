import React from 'react';
import styled from 'styled-components';
import { Alert, AlertTitle } from '@material-ui/lab';
import { QueryParameters } from '../types/app.types';

export const StyledContentWrapper = styled.div`
  margin: 2rem 1rem;
`;

const SuccessPage = () => {
  const query = new URLSearchParams(window.location.search);
  const message = query.get(QueryParameters.message);

  return (
    <StyledContentWrapper>
      <Alert severity="success" data-testid="ncip-success-alert">
        <AlertTitle>{message}</AlertTitle>
      </Alert>
    </StyledContentWrapper>
  );
};

export default SuccessPage;
