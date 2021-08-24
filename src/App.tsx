import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { getMetadata } from './api/api';
import ErrorBanner from './components/ErrorBanner';
import styled from 'styled-components';
import { MetaData } from './types/app.types';
import MetadataHolder from './components/MetadataPresentation';

export const StyledFullPageProgressWrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
`;

export const PageWrapper = styled.div`
  width: 100%
  padding: 0;
  margin: 1rem;
`;

export const StyledPageTitleTypography = styled(Typography)`
  width: 100%;
  padding: 1rem;
`;

const App = () => {
  const [metaData, setMetaData] = useState<MetaData>();
  const [isLoadingMetaData, setIsLoadingMetaData] = useState(false);
  const [fetchMetaDataError, setFetchMetaDataError] = useState<Error>();

  //todo: read url for recordid, patronid and vid
  const id = '1';

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
    fetchMetadata().then();
  }, []);

  return (
    <>
      {!isLoadingMetaData ? (
        metaData && (
          <PageWrapper>
            <Typography variant="h1" gutterBottom>
              Use this form to send ILL-request using NCIP
            </Typography>
            <MetadataHolder metaData={metaData} />
          </PageWrapper>
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
