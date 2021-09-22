import React from 'react';
import styled from 'styled-components';
import { Alert, AlertTitle } from '@material-ui/lab';

export const StyledContentWrapper = styled.div`
  margin: 2rem 1rem;
`;

const SuccessPage = () => {
  return (
    <StyledContentWrapper>
      <Alert severity="success" data-testid="ncip-success-alert">
        <AlertTitle>Successfully ordered</AlertTitle>
      </Alert>
    </StyledContentWrapper>
  );
};

export default SuccessPage;
