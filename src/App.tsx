import React, { useEffect, useState } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { getLibraryAccess, getMetadata } from './api/api';
import ErrorBanner from './components/ErrorBanner';
import styled from 'styled-components';
import { LibraryAccess, MetaData } from './types/app.types';
import MetadataHolder from './components/MetadataPresentation';
import OrderSchema from './components/OrderSchema';
import WarningBanner from './components/WarningBanner';

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
  padding: 0;
  margin: 1rem;
  word-break: break-word;
`;

export const StyledPageTitleTypography = styled(Typography)`
  width: 100%;
`;

const App = () => {
  const query = new URLSearchParams(window.location.search);
  const recordId = query.get('recordid');
  const patronId = query.get('patronid');
  const vId = query.get('vid');
  const [metaData, setMetaData] = useState<MetaData>();
  const [libraryAccess, setLibraryAccess] = useState<LibraryAccess>();
  const [isLoadingAccess, setIsLoadingAccess] = useState(true);
  const [isLoadingMetaData, setIsLoadingMetaData] = useState(false);
  const [appError, setAppError] = useState<Error>();
  const [fetchMetaDataError, setFetchMetaDataError] = useState<Error>();

  useEffect(() => {
    const fetchLibraryAccess = async () => {
      try {
        setIsLoadingAccess(true);
        setAppError(undefined);
        patronId && setLibraryAccess((await getLibraryAccess(patronId)).data);
      } catch (error) {
        error instanceof Error && setAppError(error);
      } finally {
        setIsLoadingAccess(false);
      }
    }; //TODO: tests
    const fetchMetadata = async () => {
      try {
        setIsLoadingMetaData(true);
        setFetchMetaDataError(undefined);
        recordId && setMetaData((await getMetadata(recordId)).data);
      } catch (error) {
        error instanceof Error && setFetchMetaDataError(error);
      } finally {
        setIsLoadingMetaData(false);
      }
    };
    if (!recordId || !patronId || !vId) {
      setAppError(new Error('URL must contain parameters: recordid, patrondid and vid'));
    } else {
      fetchLibraryAccess().then();
      fetchMetadata().then();
    }
  }, [recordId, patronId, vId]);

  //TODO: hva skjer med favicon

  return (
    <>
      {appError ? (
        <ErrorBanner error={appError} />
      ) : isLoadingAccess ? (
        <StyledFullPageProgressWrapper>
          <CircularProgress />
        </StyledFullPageProgressWrapper>
      ) : !libraryAccess?.isNCIPLibrary ? (
        <WarningBanner message="Sorry, this feature is not available. Your institution does not support this ILL functionality" />
      ) : !isLoadingMetaData ? (
        metaData && (
          <PageWrapper>
            <Typography variant="h1" gutterBottom>
              Use this form to send ILL-request using NCIP
            </Typography>
            <MetadataHolder metaData={metaData} />
            <OrderSchema metaData={metaData} />
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
