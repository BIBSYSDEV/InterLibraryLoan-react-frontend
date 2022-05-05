import React from 'react';
import { Alert, AlertTitle } from '@mui/material';
import styled from 'styled-components';

const StyledAlert = styled(Alert)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

const NoInventoryFound = () => {
  return (
    <StyledAlert data-testid="no-inventory-found" severity="error">
      <AlertTitle>No library has this document</AlertTitle>
    </StyledAlert>
  );
};

export default NoInventoryFound;
