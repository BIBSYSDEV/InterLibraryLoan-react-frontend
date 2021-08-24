import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { getMetadata } from './api/api';
import ErrorBanner from './components/ErrorBanner';
import styled from 'styled-components';
import { MetaData } from './types/app.types';
import MetadataHolder from './components/MetadataPresentation';
import { useLocation } from 'react-router';

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

const AppContent = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const recordId = query.get('recordid');
  // const patronId = query.get('patronid');
  // const vId = query.get('vid');
  const [metaData, setMetaData] = useState<MetaData>();
  const [isLoadingMetaData, setIsLoadingMetaData] = useState(false);
  const [isMissingRecordId, setIsMissingRecordId] = useState(false);
  const [fetchMetaDataError, setFetchMetaDataError] = useState<Error>();

  useEffect(() => {
    const fetchMetadata = async () => {
      if (recordId) {
        try {
          setIsLoadingMetaData(true);
          setFetchMetaDataError(undefined);
          recordId && setMetaData((await getMetadata(recordId)).data);
        } catch (error) {
          setFetchMetaDataError(error);
        } finally {
          setIsLoadingMetaData(false);
        }
      } else {
        setIsMissingRecordId(true);
      }
    };
    fetchMetadata().then();
  }, [recordId]);

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
      {isMissingRecordId && <ErrorBanner error={new Error('URL is missing parameter "recordid"')} />}
    </>
  );
};

export default AppContent;
