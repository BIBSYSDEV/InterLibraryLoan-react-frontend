import React, { useEffect, useState } from 'react';
import { CircularProgress, Grid, Typography } from '@material-ui/core';
import { getMetadata } from './api/api';
import ErrorBanner from './components/ErrorBanner';
import styled from 'styled-components';
import { MetaData } from './types/app.types';

export const StyledFullPageProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
`;

const id = '1';

const App = () => {
  const [metaData, setMetaData] = useState<MetaData>();
  const [isLoadingMetaData, setIsLoadingMetaData] = useState(false);
  const [fetchMetaDataError, setFetchMetaDataError] = useState<Error>();

  useEffect(() => {
    const fetchMetadata = async () => {
      try {
        setIsLoadingMetaData(true);
        setFetchMetaDataError(undefined);
        setMetaData((await getMetadata(id)).data);
      } catch (error) {
        setFetchMetaDataError(error);
      } finally {
        setIsLoadingMetaData(false);
      }
    };
    fetchMetadata();
  }, []);

  return (
    <>
      {!isLoadingMetaData ? (
        metaData && (
          <>
            <Typography variant="h1">Use this form to send ILL-request using NCIP</Typography>
            <Grid container spacing={1}>
              <Grid item>Title: {metaData.title}</Grid>
            </Grid>
          </>
        )
      ) : (
        <StyledFullPageProgressWrapper>
          <CircularProgress />
        </StyledFullPageProgressWrapper>
      )}
      {fetchMetaDataError && <ErrorBanner error={fetchMetaDataError} />}
    </>
  );
};

export default App;
