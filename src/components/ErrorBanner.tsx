import React, { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';

const StyledAlert = styled(Alert)`
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
`;

interface ErrorBannerProps {
  error?: Error;
}

const ErrorBanner: FC<ErrorBannerProps> = ({ error }) => {
  return (
    <StyledAlert severity="error" data-testid="alert">
      <AlertTitle>An error has occurred</AlertTitle>
      {error && <Typography variant="caption">( Error message: {error.message})</Typography>}
    </StyledAlert>
  );
};

export default ErrorBanner;
