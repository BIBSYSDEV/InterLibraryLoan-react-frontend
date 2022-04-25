import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

export const StyledContentWrapper = styled.div`
  width: 100%;
  margin-top: 2rem;
  max-width: ${({ theme }) => theme.breakpoints.values.md + 'px'};
  display: flex;
  justify-content: center;
`;

const NotFoundPage = () => {
  return (
    <StyledContentWrapper>
      <Typography variant="h1" data-testId="404">
        Got lost? (404-page)
      </Typography>
    </StyledContentWrapper>
  );
};

export default NotFoundPage;
