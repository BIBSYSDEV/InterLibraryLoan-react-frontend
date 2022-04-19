import React, { FC } from 'react';
import styled from 'styled-components';
import { Alert, AlertTitle } from '@mui/material';

const StyledAlert = styled(Alert)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

interface WarningMessageProps {
  message: string;
}

const WarningBanner: FC<WarningMessageProps> = ({ message }) => {
  return (
    <StyledAlert severity="warning" data-testid="warning">
      <AlertTitle>{message}</AlertTitle>
    </StyledAlert>
  );
};

export default WarningBanner;
